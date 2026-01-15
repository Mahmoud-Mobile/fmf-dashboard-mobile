/**
 * Recursively flattens nested layout elements to extract all seats
 * @param {Array} elements - Array of layout elements (may contain nested children)
 * @returns {Array} Flattened array of all elements (excluding rows, but including their children)
 */
const flattenLayoutElements = (elements) => {
  if (!Array.isArray(elements)) {
    return [];
  }

  const flattened = [];

  elements.forEach((element) => {
    if (!element || typeof element !== "object") {
      return;
    }

    // If element has children, recursively flatten them
    if (element.children && Array.isArray(element.children)) {
      const childElements = flattenLayoutElements(element.children);
      flattened.push(...childElements);
    }

    // Include the element itself if it's not a row (rows are just containers)
    // But also include it if it has a type that should be rendered
    if (element.type && element.type !== "row") {
      flattened.push(element);
    } else if (!element.type && element.id) {
      // Include elements without type if they have an id (might be seats)
      flattened.push(element);
    }
  });

  return flattened;
};

/**
 * Parses seating plan data from API response
 * @param {Object} seatingPlans - The seating plans data from Redux state
 * @returns {Object} Parsed data with layoutElements, seatsMap, and canvas dimensions
 */
export const parseSeatingData = (seatingPlans) => {
  if (!seatingPlans?.seatingPlan) {
    return {
      layoutElements: [],
      seatsMap: {},
      canvasWidth: 1200,
      canvasHeight: 800,
    };
  }

  const plan = seatingPlans.seatingPlan;
  const canvasWidth = plan.canvasWidth || 1200;
  const canvasHeight = plan.canvasHeight || 800;

  // Parse layoutData JSON string
  let rawLayoutElements = [];
  try {
    rawLayoutElements = JSON.parse(plan.layoutData || "[]");
  } catch (error) {
    console.error("Error parsing layoutData:", error);
    rawLayoutElements = [];
  }

  // Flatten nested elements to extract all seats from rows
  let layoutElements = flattenLayoutElements(rawLayoutElements);

  // Create a map of seats by elementId for quick lookup
  const seatsMap = {};
  if (seatingPlans.seats && Array.isArray(seatingPlans.seats)) {
    seatingPlans.seats.forEach((seat) => {
      seatsMap[seat.elementId] = seat;
    });
  }

  // Create a set of element IDs that are already in layoutElements
  const existingElementIds = new Set(
    layoutElements.map((el) => el.id).filter(Boolean)
  );

  // Add missing seats from seatsMap that aren't in layoutElements
  // This ensures all seats are rendered even if they're not in the layoutData
  // Only add if the seat has position data (x, y) or if it's referenced but missing from layout
  Object.keys(seatsMap).forEach((elementId) => {
    if (!existingElementIds.has(elementId)) {
      const seat = seatsMap[elementId];
      // Only create element if seat has position data or if we want to render it anyway
      // Check if seat has any position-related properties
      if (seat.x !== undefined || seat.y !== undefined || seat.position) {
        layoutElements.push({
          id: elementId,
          type: "chair",
          x: seat.x || seat.position?.x || 0,
          y: seat.y || seat.position?.y || 0,
          width: seat.width || 20,
          height: seat.height || 20,
          rotation: seat.rotation || 0,
        });
      }
    }
  });

  // Calculate actual bounds from all elements to ensure all seats are visible
  let maxX = canvasWidth;
  let maxY = canvasHeight;
  let minX = 0;
  let minY = 0;

  layoutElements.forEach((element) => {
    if (
      typeof element.x === "number" &&
      !isNaN(element.x) &&
      typeof element.y === "number" &&
      !isNaN(element.y)
    ) {
      const elementWidth = element.width || 40;
      const elementHeight = element.height || 40;
      const rightEdge = element.x + elementWidth;
      const bottomEdge = element.y + elementHeight;

      if (rightEdge > maxX) maxX = rightEdge;
      if (bottomEdge > maxY) maxY = bottomEdge;
      if (element.x < minX) minX = element.x;
      if (element.y < minY) minY = element.y;
    }
  });

  // Use the maximum of plan canvas size and actual element bounds
  // Add some padding to ensure elements aren't cut off
  const padding = 50;
  const actualCanvasWidth = Math.max(canvasWidth, maxX - minX + padding);
  const actualCanvasHeight = Math.max(canvasHeight, maxY - minY + padding);

  // Log for debugging
  console.log("Total layout elements after flattening:", layoutElements.length);
  console.log("Element types count:", {
    chairs: layoutElements.filter((el) => el.type === "chair").length,
    tables: layoutElements.filter((el) => el.type === "table").length,
    stages: layoutElements.filter((el) => el.type === "stage").length,
    rows: layoutElements.filter((el) => el.type === "row").length,
    other: layoutElements.filter(
      (el) => !el.type || !["chair", "table", "stage", "row"].includes(el.type)
    ).length,
  });
  console.log("Total seats in seatsMap:", Object.keys(seatsMap).length);
  console.log(`Canvas bounds - Plan: ${canvasWidth}x${canvasHeight}, Actual: ${actualCanvasWidth}x${actualCanvasHeight}, Elements: ${minX},${minY} to ${maxX},${maxY}`);

  // Debug: Check position data for first few chairs
  const chairs = layoutElements.filter((el) => el.type === "chair");
  if (chairs.length > 0) {
    const sampleChairs = chairs.slice(0, 3);
    console.log(
      "Sample chair positions:",
      sampleChairs.map((chair) => ({
        id: chair.id,
        x: chair.x,
        y: chair.y,
        width: chair.width,
        height: chair.height,
        hasValidPosition:
          typeof chair.x === "number" && typeof chair.y === "number",
      }))
    );

    // Check for invalid positions
    const invalidChairs = chairs.filter(
      (chair) =>
        typeof chair.x !== "number" ||
        isNaN(chair.x) ||
        typeof chair.y !== "number" ||
        isNaN(chair.y) ||
        typeof chair.width !== "number" ||
        isNaN(chair.width) ||
        chair.width <= 0 ||
        typeof chair.height !== "number" ||
        isNaN(chair.height) ||
        chair.height <= 0
    );
    if (invalidChairs.length > 0) {
      console.warn(
        `Found ${invalidChairs.length} chairs with invalid position/size data`
      );
    }
  }

  return {
    layoutElements,
    seatsMap,
    canvasWidth: actualCanvasWidth,
    canvasHeight: actualCanvasHeight,
  };
};

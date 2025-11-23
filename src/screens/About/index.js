import React from "react";
import { View, ScrollView, Text } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";

const About = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="About"
        onLeftButtonPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            Future Minerals Forum: The World's Government-Led Minerals Platform
          </Text>

          <Text style={styles.description}>
            The Future Minerals Forum (FMF) is a government-led platform for
            shaping the future of minerals. Since its inauguration in 2022, FMF
            has grown to become the world's leading minerals gathering, bringing
            together senior government officials, industry leaders, multilateral
            organizations, NGOs, academia, trade associations, and other
            stakeholders across the entire mineral value chain in an
            action-focused setting. FMF is unique for its audacious approach,
            confronting industry challenges head-on through genuine dialogue
            that results into tangible outcomes, including resilient and
            responsible mineral supply chains. Collaboration at FMF is critical
            in enabling development, driving the global electrification goals,
            enhancing global security and accelerating the digital revolution.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Col, Grid } from "react-native-easy-grid";

const SKILLS = ['Frontend', 'Backend', 'Mobile', 'Databases'];
const MIN = 0;
const MAX = 5;

export default function App() {

  const [values, setValues] = useState(new Array(SKILLS.length).fill(0));
  const [average, setAverage] = useState(0);

  useEffect(() => {
    calculateAverageSkill();  
  }, [values]);
  
  const items = [];
  for (let i = 0; i < SKILLS.length; i++) {
    items.push(
      <View key={"item" + i} style={styles.skills}>
        <Text style={styles.skill}>{SKILLS[i]}</Text>
        <Text style={styles.value}>Skill: {values[i]}</Text>
        <Grid style={styles.grid}>
          <Col size={5}><Text>{MIN}</Text></Col>
          <Col size={90}>
            <Slider
              style={{width: 250, height: 40}}
              minimumValue={MIN}
              maximumValue={MAX}
              step={1}
              value={values[i]}
              minimumTrackTintColor="#006666"
              maximumTrackTintColor="#ff9900"
              onValueChange={(val) => setSkillValue(val, i)}/>
          </Col>
          <Col style={styles.colMax} size={5}><Text>{MAX}</Text></Col>
        </Grid>
      </View>
    );
  }

  function setSkillValue(val, i) {
    let skillValues = [...values];
    skillValues[i] = val;
    setValues(skillValues);
  }

  function calculateAverageSkill() {
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = (sum / values.length) || 0;
    setAverage(avg);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Skill set</Text>
      <View>{items}</View>
      <Text style={styles.averageHeader}>Average</Text>
      <Text style={styles.averageValue}>{average}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  skills: {
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold'
  },
  grid: {
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center'
  },
  skill: {
    marginTop: 35,
    fontSize: 25
  },
  value: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20
  },
  averageHeader: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 25,
  },
  averageValue: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 40,
  },
  colMax: {
    marginLeft: 20
  }
});


/*eslint-disable*/
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Layout from '../components/Layout'
import AdminList from '../components/AdminList'

const ProfileScreen = () => {
      return (
        <Layout>
            <AdminList />
        </Layout>
    )
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});

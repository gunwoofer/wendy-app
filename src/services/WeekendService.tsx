import React, { useState } from 'react';
import { Weekend } from '../models/weekend';
import { EXPO_PUBLIC_SERVER_IP } from '@env';

// Define the type for the WeekendService instance
interface WeekendServiceInstance {
  setWeekendAPI: (id: number, name: string, address: string, tricount_link: string, reservation_link: string, date_debut: string, date_fin: string) => Promise<Weekend>;
  getWeekendByIdAPI: (id: number) => Promise<Weekend>;
  setWeekendPhoto(id: number, image_base64: string): Promise<any>;
}

// Define the type for the singleton instance of WeekendService
interface WeekendServiceSingleton {
  getInstance: () => WeekendServiceInstance;
}

// Define the singleton instance
const WeekendService: WeekendServiceSingleton = (function () {
  let instance: WeekendServiceInstance | null = null;

  function createInstance(): WeekendServiceInstance {

    async function setWeekendAPI(id: number, name: string, address: string, tricount_link: string, reservation_link: string, date_debut: string, date_fin: string): Promise<Weekend> {
      console.log("update weekend")
      const response = await fetch(`${EXPO_PUBLIC_SERVER_IP}/updateWeekend/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "address": address,
          "tricount_link": tricount_link,
          "reservation_link": reservation_link,
          "date_debut": date_debut,
          "date_fin": date_fin }),
      });
      const weekend: Weekend = await response.json();
      return weekend;
    }

    async function getWeekendByIdAPI(id: number): Promise<Weekend> {
      console.log("get weekend by id")
      console.log("get weekend by id")
      console.log("get weekend by id")

      const response = await fetch(EXPO_PUBLIC_SERVER_IP + '/getWeekendById/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log("fetch get weekend by id")

      const weekend: Weekend = await response.json();

      // const weekend: Weekend = {
      //   id: 1,
      //   name: "Weekend 1",
      //   date_debut: "2021-05-01",
      //   date_fin: "2021-05-02",
      //   status: "coming",
      //   address: "address",
      //   participants: [
      //     {
      //       id: 1,
      //       first_name: "User",
      //       second_name: "Second",
      //       email: "user@gmail.com",
      //       is_present: true,
      //       is_driver: false
      //     },
      //     {
      //       id: 2,
      //       first_name: "User2",
      //       second_name: "Second2",
      //       email: "user2@gmail.com",
      //       is_present: false,
      //       is_driver: false
      //     },
      //     {
      //       id: 3,
      //       first_name: "User3",
      //       second_name: "Second3",
      //       email: "user3@gmail.com",
      //       is_present: true,
      //       is_driver: true
      //     },
      //   ],
      //   sharing_code: "sharing_code",
      //   tricount_link: "tricount_link",
      //   reservation_link: "reservation_link"
      // }

      console.log("weekend: get weekend by id")
      return weekend;
    }

    async function setWeekendPhoto(id: number, image_base64: string): Promise<any> {
      console.log("set weekend photo")
      const response = await fetch(EXPO_PUBLIC_SERVER_IP + '/upload_image/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base64_image: image_base64
        }),
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const responseData = await response.json();
      return responseData;
    }

    return {
      setWeekendAPI,
      getWeekendByIdAPI,
      setWeekendPhoto
    };
  }

  // Return the WeekendServiceSingleton object
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export default WeekendService;
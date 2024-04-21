import React, { useState } from 'react';
import { Weekend } from '../models/weekend';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

const url = 'http://192.168.0.101:3000'

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
      const response = await fetch(`${url}/updateWeekend/${id}`, {
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

      const response = await fetch(url + '/getWeekendById/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log("fetch get weekend by id")

      const weekend: Weekend = await response.json();

      console.log("weekend: get weekend by id")
      return weekend;
    }

    async function setWeekendPhoto(id: number, image_base64: string): Promise<any> {
      console.log("set weekend photo")
      const response = await fetch(url + '/upload_image/' + id, {
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
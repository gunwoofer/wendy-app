import React, { useState } from 'react';
import { Weekend } from '../models/weekend';
import { SERVER_IP } from '@env';

// Define the type for the WeekendService instance
interface WeekendServiceInstance {
  setWeekendAPI: () => Promise<Weekend>;
  getWeekendByIdAPI: (id: number) => Promise<Weekend>;
}

// Define the type for the singleton instance of WeekendService
interface WeekendServiceSingleton {
  getInstance: () => WeekendServiceInstance;
}

// Define the singleton instance
const WeekendService: WeekendServiceSingleton = (function () {
  let instance: WeekendServiceInstance | null = null;

  function createInstance(): WeekendServiceInstance {

    async function setWeekendAPI(): Promise<Weekend> {
      const response = await fetch("http://your-api-url");
      const data: Weekend = await response.json();
      return data;
    }

    async function getWeekendByIdAPI(id: number): Promise<Weekend> {
      const response = await fetch(SERVER_IP + '/getWeekendById/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const weekend: Weekend = await response.json();
      return weekend;
    }

    return {
      setWeekendAPI,
      getWeekendByIdAPI
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
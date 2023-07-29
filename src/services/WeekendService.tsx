import React, { useState } from 'react';
import { Weekend } from '../models/weekend';
import { SERVER_IP } from '@env';

// Define the type for the WeekendService instance
interface WeekendServiceInstance {
  setWeekendAPI: (id: number, name: string, address: string, tricount_link: string, reservation_link: string, date_debut: string, date_fin: string) => Promise<Weekend>;
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

    async function setWeekendAPI(id: number, name: string, address: string, tricount_link: string, reservation_link: string, date_debut: string, date_fin: string): Promise<Weekend> {
      const response = await fetch(`${SERVER_IP}/updateWeekend/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "name": name, "address": address, "tricount_link": tricount_link, "reservation_link": reservation_link, "date_debut": date_debut, "date_fin": date_fin }),
      });
      const weekend: Weekend = await response.json();
      return weekend;
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
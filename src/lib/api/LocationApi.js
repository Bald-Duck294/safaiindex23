import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const LocationsApi = {
  // Get all locations
  getAllLocations: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getLocations?cb=${Date.now()}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching locations:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get single location by ID
  getLocationById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/locations/${id}?cb=${Date.now()}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching location:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Update location
  updateLocation: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/locations/${id}`, data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating location:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Delete location
  deleteLocation: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/locations/${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error deleting location:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

export default LocationsApi;
import axios from "axios";

import API_BASE_URL from "../utils/Constant";
// export const LocationsApi = {
//   // Get all locations
//   getAllLocations: async () => {
//     console.log("in get all locations");
//     try {
//       //        `${API_BASE_URL}/locations?cb=` + Date.now()

//       const response = await axios(
//         `${API_BASE_URL}/locations`
//       );

//       console.log(response.data, "data22");
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       console.error("Error fetching locations:", error);
//       return {
//         success: false,
//         error: error.message,
//       };
//     }
//   },

//   postLocation: async (data) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/locations`, {
//         name: data.name,
//         parentId: data.parent_id,
//         typeId: data.type_id,
//         latitude: data.latitude,
//         longitude: data.longitude,
//         options: data.options,
//       });
//       console.log(response, "post sucessfull");
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       return {
//         success: false,
//         error: error.message,
//       };
//     }
//   },

//   // Get single location by ID
//   getLocationById: async (id) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/locations/${id}?cb=${Date.now()}`
//       );
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       return {
//         success: false,
//         error: error.message,
//       };
//     }
//   },

//   // Update location
//   updateLocation: async (id, data) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/locations/${id}`, data);
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       console.error("Error updating location:", error);
//       return {
//         success: false,
//         error: error.message,
//       };
//     }
//   },

//   // Delete location
//   deleteLocation: async (id) => {
//     try {
//       const response = await axios.delete(`${API_BASE_URL}/locations/${id}`);
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       console.error("Error deleting location:", error);
//       return {
//         success: false,
//         error: error.message,
//       };
//     }
//   },

//   fetchZonesWithToilets: async (id) => {
//     console.log("in fetch washrooms zones");
//     try {
//       const res = await axios.get(`${API_BASE_URL}/zones`);
//       console.log(res.data, "response"); // Always access `.data` in Axios
//       return res.data;
//     } catch (error) {
//       console.error("Failed to fetch zones:", error.message);
//       throw new Error("Failed to fetch zones");
//     }
//   },

// };

export const LocationsApi = {
  // Get all locations
  getAllLocations: async () => {
    console.log("in get all locations");
    try {
      const response = await axios.get(`${API_BASE_URL}/locations`);
      console.log(response.data, "data22");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching locations:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Enhanced method to fetch zones with different grouping options
  fetchZonesWithToilets: async (options = {}) => {
    try {
      const { groupBy = "zone", showCompanyZones = true } = options;

      const params = new URLSearchParams();
      params.append("groupBy", groupBy);
      params.append("showCompanyZones", showCompanyZones.toString());

      const response = await axios.get(
        `${API_BASE_URL}/zones?${params.toString()}`
      );

      console.log(response.data, "zones data");
      return response.data;
    } catch (error) {
      console.error("Error fetching zones with toilets:", error);
      throw error;
    }
  },

  // Get hierarchical location structure starting from a parent
  getHierarchicalLocations: async (parentId = null) => {
    try {
      const params = new URLSearchParams();
      if (parentId) {
        params.append("parentId", parentId);
      }

      const response = await axios.get(
        `${API_BASE_URL}/locations/hierarchy?${params.toString()}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching hierarchical locations:", error);
      throw error;
    }
  },

  // Get locations by company
  getLocationsByCompany: async (companyId = null) => {
    try {
      const params = new URLSearchParams();
      if (companyId) {
        params.append("companyId", companyId);
      }

      const response = await axios.get(
        `${API_BASE_URL}/locations/by-company?${params.toString()}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching locations by company:", error);
      throw error;
    }
  },

  // Get location types hierarchy
  getLocationTypes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/location-types`);
      return response.data;
    } catch (error) {
      console.error("Error fetching location types:", error);
      throw error;
    }
  },

  postLocation: async (data) => {
    console.log(data, "posting the data");
    try {
      const response = await axios.post(`${API_BASE_URL}/locations`, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error posting location:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  updateLocation: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/locations/${id}`, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error updating location:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
  // Get single location by ID
  getLocationById: async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/locations/${id}?cb=${Date.now()}`
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching location:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
};
export default LocationsApi;

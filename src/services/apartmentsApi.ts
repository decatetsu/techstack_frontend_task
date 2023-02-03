import axios from "axios";
import {CreateApartment} from "../models/create-apartment";

const baseUrl = 'http://127.0.0.1:5512/apartments'

export const fetchApartments = async (price: string | null, rooms: number | null) => {
  return axios
    .get(`${baseUrl}?${price !== null ? `price=${price}&` : ''}${rooms !== null ? `rooms=${rooms}` : ''}`);
}

export const createApartment = async (newApartment: CreateApartment) => {
  return axios.post(`${baseUrl}`, newApartment);
}

export const deleteApartment = async (id: string) => {
  return axios.delete(`${baseUrl}/${id}`);
}

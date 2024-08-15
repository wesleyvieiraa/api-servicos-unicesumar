import { Service } from "models/Service.model";
import httpService from "./http.service";

class ServicesService {
  private baseUrl = "/service";
  list = async (
    name: string = null,
    categoryId: string = null,
    sort: string = null,
    page: number = 1
  ) => {
    let query = "?";
    query += name ? `name=${name}&` : "";
    query += categoryId ? `categoryId=${categoryId}&` : "";
    query += sort ? `sort=${sort}&` : "";
    query += page > 0 ? `page=${page}&` : "";
    query = query.substring(query.length - 1) == "&" ? query.substring(0, query.length - 1) : "";

    return await httpService.get(`${this.baseUrl}/list${query}`);
  };

  create = async (payload: Service) => {
    return await httpService.post(`${this.baseUrl}/create`, payload);
  };

  update = async (payload: Service) => {
    return await httpService.put(`${this.baseUrl}/update`, payload);
  };
}

export default new ServicesService();

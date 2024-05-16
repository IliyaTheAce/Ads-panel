import ApiService from "@/services/ApiService";

export async function GetDashboardData<T>() {
  return ApiService.fetchData<T>({
    url: `/dashboard`,
    method: 'get',
  })
}

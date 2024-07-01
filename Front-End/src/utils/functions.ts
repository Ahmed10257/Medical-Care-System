import { configAxios } from "../config/api";

export function isAuth(): boolean {
  return !!localStorage.getItem("user");
}

export function logout(): void {
  localStorage.removeItem("user");
  configAxios.post('/auth/logout').then((res)=>{
    console.log(res.data);
  })
}

export function getRole () {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.isPatient) {
    return "patient";
  } else {
    return "doctor";
  }
}

export async function getAuthPatient() {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await configAxios.get("/auth/patient-id-from-token");
    console.log(response.data);
    return response.data.patientId;
  } catch (error) {
    console.log(error);
  }
}

export async function getAuthDoctor() {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await configAxios.get("/doctor-auth/doctor-id-from-token");
    console.log("dnnd",response.data);
    return response.data.doctorId;
  } catch (error) {
    console.log(error);
  }
}

export async function getPtient() {
  try {
    const patientId = await getAuthPatient();
    if (!patientId) return null;
    await configAxios.get(`/patient/${patientId}`).then((response) => {
      console.log("dd",response.data);
      return response.data;
    });
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function getDoctor() {
  try {
    const doctorId = await getAuthDoctor();
    if (!doctorId) {
      return null;
    }
    await configAxios.get(`/doctor/${doctorId}`).then((response) => {
      console.log(response.data);
      return response.data;
    });
  } catch (error) {
    console.log(error);
  }
  return null;
}

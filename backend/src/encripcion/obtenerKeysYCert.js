import { ComputadoraLocalService } from "../services/computadoraLocal.service.js";


const cryptData = await ComputadoraLocalService.getKeysAndCertPEM();

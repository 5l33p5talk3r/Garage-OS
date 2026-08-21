import { get, set, update, del } from 'idb-keyval';

export interface PendingOperation {
  id: string;
  type: "CREATE_VEHICLE" | "UPDATE_VEHICLE" | "DELETE_VEHICLE" | "UPDATE_PROFILE";
  payload: any;
  timestamp: string;
}

const PENDING_OPS_KEY = 'garage_os_pending_ops';
const VEHICLES_CACHE_KEY = 'garage_os_vehicles_cache';
const PROFILE_CACHE_KEY = 'garage_os_profile_cache';

export const getPendingOperations = async (): Promise<PendingOperation[]> => {
  return (await get(PENDING_OPS_KEY)) || [];
};

export const addPendingOperation = async (operation: Omit<PendingOperation, "id" | "timestamp">) => {
  const newOp: PendingOperation = {
    ...operation,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString()
  };

  await update(PENDING_OPS_KEY, (val) => {
    const ops = (val as PendingOperation[]) || [];
    return [...ops, newOp];
  });
};

export const clearPendingOperations = async () => {
  await set(PENDING_OPS_KEY, []);
};

export const cacheVehicles = async (vehicles: any[]) => {
  await set(VEHICLES_CACHE_KEY, vehicles);
};

export const getCachedVehicles = async (): Promise<any[]> => {
  return (await get(VEHICLES_CACHE_KEY)) || [];
};

export const cacheProfile = async (profile: any) => {
  await set(PROFILE_CACHE_KEY, profile);
};

export const getCachedProfile = async (): Promise<any | null> => {
  return (await get(PROFILE_CACHE_KEY)) || null;
};

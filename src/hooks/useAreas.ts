import { useSyncExternalStore } from "react";
import { areaRepository } from "../data/repositories/areaRepository";

export function useAreas() {
  const cities = useSyncExternalStore(areaRepository.subscribe, areaRepository.getSnapshot);
  const availability = useSyncExternalStore(
    areaRepository.subscribeAvailability,
    areaRepository.getAvailabilitySnapshot
  );

  return {
    cities,
    availability,
    addCity: (name: string) => areaRepository.addCity(name),
    addArea: (cityId: string, name: string) => areaRepository.addArea(cityId, name),
    addLocality: (cityId: string, areaId: string, name: string) =>
      areaRepository.addLocality(cityId, areaId, name),
    toggleCityActive: (cityId: string) => areaRepository.toggleCityActive(cityId),
    toggleAreaActive: (cityId: string, areaId: string) => areaRepository.toggleAreaActive(cityId, areaId),
    toggleLocalityActive: (cityId: string, areaId: string, localityId: string) =>
      areaRepository.toggleLocalityActive(cityId, areaId, localityId),
  };
}

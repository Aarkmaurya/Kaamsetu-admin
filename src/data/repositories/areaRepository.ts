import type { City, ServiceAvailabilityEntry } from "../../types/area";
import { areaMockData, serviceAvailabilityMockData } from "../mock/areaMockData";
import { ListStore } from "./ListStore";

/**
 * BACKEND TODO: this in-memory tree is a stand-in for a future areas table
 * (and the technician/job matching that depends on it). A real
 * implementation must validate area/locality names server-side and enforce
 * that only authorized admins can add or disable coverage — not just hide
 * the "Add" buttons in this UI.
 */
class AreaRepository {
  private store = new ListStore<City>(areaMockData);
  private availabilityStore = new ListStore<ServiceAvailabilityEntry>(serviceAvailabilityMockData);
  private nextCityId = areaMockData.length + 1;
  private nextAreaId = 1;
  private nextLocalityId = 1;

  subscribe = this.store.subscribe;
  getSnapshot = this.store.getSnapshot;

  subscribeAvailability = this.availabilityStore.subscribe;
  getAvailabilitySnapshot = this.availabilityStore.getSnapshot;

  addCity(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const city: City = {
      id: `city_custom_${this.nextCityId++}`,
      name: trimmed,
      isActive: true,
      areas: [],
    };
    this.store.add(city);
  }

  addArea(cityId: string, name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const areaId = `area_custom_${this.nextAreaId++}`;
    this.store.update(
      (city) => city.id === cityId,
      (city) => ({
        ...city,
        areas: [...city.areas, { id: areaId, name: trimmed, isActive: true, localities: [] }],
      })
    );
  }

  addLocality(cityId: string, areaId: string, name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const localityId = `loc_custom_${this.nextLocalityId++}`;
    this.store.update(
      (city) => city.id === cityId,
      (city) => ({
        ...city,
        areas: city.areas.map((area) =>
          area.id === areaId
            ? { ...area, localities: [...area.localities, { id: localityId, name: trimmed, isActive: true }] }
            : area
        ),
      })
    );
  }

  toggleCityActive(cityId: string) {
    this.store.update(
      (city) => city.id === cityId,
      (city) => ({ ...city, isActive: !city.isActive })
    );
  }

  toggleAreaActive(cityId: string, areaId: string) {
    this.store.update(
      (city) => city.id === cityId,
      (city) => ({
        ...city,
        areas: city.areas.map((area) => (area.id === areaId ? { ...area, isActive: !area.isActive } : area)),
      })
    );
  }

  toggleLocalityActive(cityId: string, areaId: string, localityId: string) {
    this.store.update(
      (city) => city.id === cityId,
      (city) => ({
        ...city,
        areas: city.areas.map((area) =>
          area.id === areaId
            ? {
                ...area,
                localities: area.localities.map((locality) =>
                  locality.id === localityId ? { ...locality, isActive: !locality.isActive } : locality
                ),
              }
            : area
        ),
      })
    );
  }
}

export const areaRepository = new AreaRepository();


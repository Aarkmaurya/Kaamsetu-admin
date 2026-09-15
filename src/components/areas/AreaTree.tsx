import { useState } from "react";
import type { City } from "../../types/area";
import { Button } from "../common/Button";
import { StatusBadge } from "../common/StatusBadge";
import { EmptyState } from "../common/EmptyState";
import styles from "./AreaTree.module.css";

interface AreaTreeProps {
  cities: City[];
  onToggleCity: (cityId: string) => void;
  onToggleArea: (cityId: string, areaId: string) => void;
  onToggleLocality: (cityId: string, areaId: string, localityId: string) => void;
  onAddArea: (cityId: string) => void;
  onAddLocality: (cityId: string, areaId: string) => void;
}

export function AreaTree({
  cities,
  onToggleCity,
  onToggleArea,
  onToggleLocality,
  onAddArea,
  onAddLocality,
}: AreaTreeProps) {
  const [expandedCities, setExpandedCities] = useState<Set<string>>(new Set());
  const [expandedAreas, setExpandedAreas] = useState<Set<string>>(new Set());

  function toggleExpandedCity(cityId: string) {
    setExpandedCities((prev) => {
      const next = new Set(prev);
      if (next.has(cityId)) next.delete(cityId);
      else next.add(cityId);
      return next;
    });
  }

  function toggleExpandedArea(key: string) {
    setExpandedAreas((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  if (cities.length === 0) {
    return <EmptyState title="No areas available" description="Add a city to get started." />;
  }

  return (
    <div className={styles.tree}>
      {cities.map((city) => {
        const isCityExpanded = expandedCities.has(city.id);
        return (
          <div className={styles.cityNode} key={city.id}>
            <div className={styles.row}>
              <button
                type="button"
                className={styles.expandButton}
                onClick={() => toggleExpandedCity(city.id)}
                aria-expanded={isCityExpanded}
                aria-label={`${isCityExpanded ? "Collapse" : "Expand"} ${city.name}`}
              >
                {isCityExpanded ? "▾" : "▸"}
              </button>
              <span className={styles.cityName}>{city.name}</span>
              <StatusBadge label={city.isActive ? "Active" : "Disabled"} tone={city.isActive ? "success" : "neutral"} />
              <div className={styles.rowActions}>
                <Button variant="ghost" onClick={() => onAddArea(city.id)}>
                  + Add Area
                </Button>
                <Button variant="ghost" onClick={() => onToggleCity(city.id)}>
                  {city.isActive ? "Disable" : "Enable"}
                </Button>
              </div>
            </div>

            {isCityExpanded && (
              <div className={styles.children}>
                {city.areas.length === 0 && (
                  <p className={styles.emptyChildren}>No areas yet in {city.name}.</p>
                )}
                {city.areas.map((area) => {
                  const areaKey = `${city.id}:${area.id}`;
                  const isAreaExpanded = expandedAreas.has(areaKey);
                  return (
                    <div className={styles.areaNode} key={area.id}>
                      <div className={styles.row}>
                        <button
                          type="button"
                          className={styles.expandButton}
                          onClick={() => toggleExpandedArea(areaKey)}
                          aria-expanded={isAreaExpanded}
                          aria-label={`${isAreaExpanded ? "Collapse" : "Expand"} ${area.name}`}
                        >
                          {isAreaExpanded ? "▾" : "▸"}
                        </button>
                        <span className={styles.areaName}>{area.name}</span>
                        <StatusBadge
                          label={area.isActive ? "Active" : "Disabled"}
                          tone={area.isActive ? "success" : "neutral"}
                        />
                        <div className={styles.rowActions}>
                          <Button variant="ghost" onClick={() => onAddLocality(city.id, area.id)}>
                            + Add Locality
                          </Button>
                          <Button variant="ghost" onClick={() => onToggleArea(city.id, area.id)}>
                            {area.isActive ? "Disable" : "Enable"}
                          </Button>
                        </div>
                      </div>

                      {isAreaExpanded && (
                        <div className={styles.children}>
                          {area.localities.length === 0 && (
                            <p className={styles.emptyChildren}>No localities yet in {area.name}.</p>
                          )}
                          {area.localities.map((locality) => (
                            <div className={styles.localityRow} key={locality.id}>
                              <span className={styles.localityName}>{locality.name}</span>
                              <StatusBadge
                                label={locality.isActive ? "Active" : "Disabled"}
                                tone={locality.isActive ? "success" : "neutral"}
                              />
                              <Button
                                variant="ghost"
                                onClick={() => onToggleLocality(city.id, area.id, locality.id)}
                              >
                                {locality.isActive ? "Disable" : "Enable"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

import { useContext } from "react";
import { ZonesContext } from "../contexts/zonesContext";

export const useZones = () => {
  const context = useContext(ZonesContext);

  console.log(context);

  if (!context) {
    throw new Error("useZones must be used within a ZonesProvider");
  }

  return context;
};

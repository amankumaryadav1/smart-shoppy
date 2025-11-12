import { useState, useEffect } from "react";
import { UserInteraction } from "@/types/product";

export function useInteractions() {
  const [interactions, setInteractions] = useState<UserInteraction[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("user-interactions");
    if (saved) {
      setInteractions(JSON.parse(saved));
    }
  }, []);

  const trackInteraction = (productId: string, type: UserInteraction['type'], category: string) => {
    const newInteraction: UserInteraction = {
      productId,
      type,
      timestamp: Date.now(),
      category,
    };

    const updated = [...interactions, newInteraction];
    setInteractions(updated);
    localStorage.setItem("user-interactions", JSON.stringify(updated));
  };

  return { interactions, trackInteraction };
}

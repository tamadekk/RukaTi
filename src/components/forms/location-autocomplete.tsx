import React, { useState, useEffect, useRef, forwardRef } from "react";
import { MapPin, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import type { GeoapifySuggestion } from "@/types";

interface LocationAutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSelectSuggestion: (address: string) => void;
}

export const LocationAutocomplete = forwardRef<
  HTMLInputElement,
  LocationAutocompleteProps
>(({ onSelectSuggestion, value, onChange, ...props }, ref) => {
  const [suggestions, setSuggestions] = useState<GeoapifySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<number | null>(null);

  const stringValue = typeof value === "string" ? value : "";
  const lastSelectedRef = useRef(stringValue);

  // Close dropdown on outside click
  useEffect(() => {
    const closeOnClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, []);

  const fetchSuggestions = async (query: string) => {
    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
    if (!apiKey) {
      console.warn("Geoapify API key is missing");
      return;
    }

    setIsFetchingLocation(true);
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${apiKey}`,
      );
      const data = await response.json();
      if (data && data.features) {
        setSuggestions(
          data.features.map(
            (f: { properties: GeoapifySuggestion }) => f.properties,
          ),
        );
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Failed to fetch location suggestions", error);
    } finally {
      setIsFetchingLocation(false);
    }
  };

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const isInitialOrSelected = stringValue === lastSelectedRef.current;
    const isTooShort = !stringValue || stringValue.length < 3;

    if (isInitialOrSelected || isTooShort) {
      if (isTooShort) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(stringValue);
    }, 1000) as unknown as number;

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [stringValue]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Input
        ref={ref}
        value={value}
        onChange={onChange}
        {...props}
        className={`rounded-none border-black h-12 pr-10 ${props.className || ""}`}
        onFocus={(e) => {
          if (suggestions.length > 0) setShowSuggestions(true);
          props.onFocus?.(e);
        }}
        autoComplete="off"
      />
      {isFetchingLocation && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-60 overflow-y-auto">
          {suggestions.map((s, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                lastSelectedRef.current = s.formatted;
                onSelectSuggestion(s.formatted);
                setShowSuggestions(false);
              }}
              className="w-full text-left px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-neutral-100 transition-colors flex items-start gap-3"
            >
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold truncate">
                  {s.address_line1 || s.city || s.name || s.formatted}
                </span>
                <span className="text-[10px] text-gray-500 truncate uppercase tracking-wide">
                  {s.address_line2 || s.country}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

LocationAutocomplete.displayName = "LocationAutocomplete";

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react";
import { DoctorWithAppointments } from "../interfaces/Booking";

type SearchResult = DoctorWithAppointments[];

interface SearchContextType {
  searchResults: SearchResult;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult>>;
}
//--------------------------------------------------------------------
export const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState<SearchResult>([
    {
      doctor: {
        name: "",
        email: "",
        image: "",
        specialization: "SSSS",
        fees: 0,
        rating: 0,
        _id: "",
        phone: 0,
        password: "",
        address: {
          country: "",
          city: "",
          region: 0,
        },
        gender: "",
        birthdate: "",
        isDoctor: false,
        numberOfVisitors: 0,
        waitingTime: 0,
        contactInfo: "",
        clinic: {},
      },
      appointments: [],
    },
  ]);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

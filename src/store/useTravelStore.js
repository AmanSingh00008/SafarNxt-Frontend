import { create } from "zustand";
export const destinations = [
  { id:'amalfi', name:'Amalfi Coast', region:'Europe', type:'Coastal', season:'May — Oct', price:'From $8,400', coords:[14.60,40.63], image:'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1400&q=85', blurb:'Clifftop villages, private boats, and the softest Italian light.' },
  { id:'kyoto', name:'Kyoto', region:'Asia', type:'Culture', season:'Mar — May', price:'From $7,200', coords:[135.77,35.01], image:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85', blurb:'A quieter encounter with old Japan, timed to the changing seasons.' },
  { id:'rajasthan', name:'Rajasthan', region:'India', type:'Heritage', season:'Oct — Mar', price:'From ₹6,800', coords:[75.78,26.91], image:'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=85', blurb:'Palace stays and desert horizons shaped around your pace.' },
  { id:'patagonia', name:'Patagonia', region:'Americas', type:'Adventure', season:'Nov — Mar', price:'From $9,600', coords:[-73.05,-50.94], image:'https://images.unsplash.com/photo-1517783999520-f068d7431a60?auto=format&fit=crop&w=1400&q=85', blurb:'The sublime, brought close through considered wilderness.' }
];
export const useTravelStore = create((set) => ({
  selectedDestination: destinations[0],
  activeSection: "home",
  bookingStep: 1,
  booking: {},
  selectDestination: (destination) => set({ selectedDestination: destination }),
  setActiveSection: (activeSection) => set({ activeSection }),
  updateBooking: (booking) =>
    set((s) => ({ booking: { ...s.booking, ...booking } })),
  setBookingStep: (bookingStep) => set({ bookingStep }),
}));

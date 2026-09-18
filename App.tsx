import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Check,
  CheckCircle,
  Map,
  Calendar,
  CreditCard,
  Bell,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  Star,
  Upload,
  Clock,
  Clipboard,
  Trash2,
  LayoutDashboard,
  Settings,
  LogOut,
  Users,
  TrendingUp,
  SlidersHorizontal,
  ShieldCheck,
  Activity,
  FileText,
  BadgeAlert,
  Info,
  Copy,
  User,
  MapPin,
  CalendarDays,
  Menu,
  X,
  PlusCircle,
  Eye
} from 'lucide-react';
import { Court, Booking, VerificationQueueItem, ActiveView } from './types';

// Static assets matching user hotlinks exactly
const ASSETS = {
  logo: "https://lh3.googleusercontent.com/aida/AP1WRLuO1kgst0oKOQ_zQlz1qogqZQZxj-isEpehXEggsklshMmsmyMMXK5u1-mdDyex1JP5-KGRD8ej5RkCICsjSdLm-O1sY5IfwNmGiRXNHHtKVgiNWCmRIggnl0tiCBdMO26_jL23yuXyNWA62fQwGQ06yxXuxO0GZqRehPOaEmAuPBx0881uIEHte-OGfF4YA-DNEvmillFChYlxEr5MGUtuE4WShNKsGDr_pZv8BxxWc5BHsktQV2LU1Fwu",
  heroImage: "https://lh3.googleusercontent.com/aida/AP1WRLtecytnMGhbwyynDDxXQ55IywpaQOuGZ15sXCtSNKX0EEPz7xegxFozfvJnEXXvPwgExZ37E0jcDVXmBZr0rqFT0-yvwyIBZCk1yqOLXMc56dJbLxLoW__j7BigLvKuxlbUlDuP8vZSJKPR0aO-Fws1DHX31n4NgoMsqVyW5xWG38LeRQuY1jEN1pZT01mMqm4TQszxBkMvtGicvWsKyLEXKXylw-1DzdNLTE10Xf_cO68jxRpJeUMfMQgp",
  court1: "https://lh3.googleusercontent.com/aida/AP1WRLtNWpvBNlUM2-8CZPwqe6zbPSl7buiP4Z5N0oh9-zr7oXBvenbtMehXJECS5mpKjqZH6EVQr2MiRSFac2DZ7AgHibCpjxRjmDDQH9NgLRPjaxAossXjHk9B-NbawFv11J-O2Po6jdhrg9X7DltAeraoOu2uAug8EdQCJkFZ4wcvo7OAYjMuziUEb-RiObWP6kYZdS4Wu7pmqLOFzQRn3a2BdYw8YOFcxbR0QF_gLX1rMVZ8oHUsKt4m6A0",
  court2: "https://lh3.googleusercontent.com/aida/AP1WRLvmaTE-3lSt28s-1ukq8eoV5IzOeh7eiSZL1lBXsi5JHbr8mH4DvNjFPq5AWrSJSapT45oLu9-5pf37N4PV0ympUpLxkLnjypkqw1nByzR0lDv5KjOZ3_868W1aVBszFTmvsuAZx5OkIdH21piedGPz21T_ZYykZuLs32TglSAZ20CHMPClmGsDxJTyb2Y5jo8UEnnZsXFoLIsW0EsooSxpw8AKENpjzns3mK4c2S65NTyG1mDVt9CjaA0",
  court3: "https://lh3.googleusercontent.com/aida/AP1WRLsaUTBMUL3an0QWpcdZm_plm6o8Mk5iMK5ANpAM-646Z7NK4Yxu8c9mMNaQFsfc44wG0XMS3ONyi663Sni6Iv4Ew0FdBiiLrsAvaj6VcnRHJ3KBlpTJDCejRwyQNpju6kjuZbKsmsk18nop-ZBHgztUw8DvocasZQnPqepiOH7B-hN_PTa7VigJ9f0bbrqPQ8EaPZtzJBshi3XkLKe2uF1IFkoHQQVavaIisiByvjmbXyS-5L4LVIarkI0f",
  bniLogo: "https://lh3.googleusercontent.com/aida/AP1WRLtc96XwlJWMkMUpkSGlUchacCRKY5wfS6QQte-CbOtP0MM5WtOwJoDg6j44jNQkDNHy2BeZQW-aSYvMqfvxG-LlzZzVmIbXuluVrTqJAxgHGD_Yx--rsZdDMxbkvNPRSVCO6_oyUyAWVtvO4Se_PIqpLxEAt1ARwIIWBO3HWHBhkYP9mtzfEKOpS9OxgSeqEKu_0-SFXjm5UrVav2hUnGcAqlSdj3GGwf-pmOYpbZ_-3_ltuKgboQrkVZLu",
  courtThumb: "https://lh3.googleusercontent.com/aida/AP1WRLs4BBPdObRlzRQv_vATnqpW8DEAOH_ECzOnISgMUsacslpQ4E5lejGVFfrH84AKRtgtnRwk-5bi1fykevwR3a4Z4JtshTPCDol1mgS2e_h2ZXs3V0q7yaIRsAYNmgZDt1wGVJHvjrxI1UNAWi0eB7UzW2yRSIOxt2rS3Ra5AtM1V2oWIpYAaE1LwdBk2ePZLB3Wpfh-BVUDhPsEkVo3eQ3jSqspO95Rz1OYoRoQHzmVFM8IffNKD0mIGGMG",
  sidebarPitchImg: "https://lh3.googleusercontent.com/aida/AP1WRLsZezskTnyzTUB7WLH62m-LjBGSP0I86plNsxd0myVOHGJHqxmMCZg3V5D-pj5QjuM6s4CqqzqkB5oCfRoJdLGOvkZypCdKikcfxrjRIC4pFKUEAiPiYzHmKXfpYAHbjIOqlITjKxCw9DM2SNpO5K_6q0HNNer7NxJUA45zmexT71zib8hnYUNRJMbKSdn4YDJWq1jCXIs45dmRM_e-IORMBQROrised8Y6smtBWE1NG6Up-a2SZcnSMZuh",
  avatar: "https://lh3.googleusercontent.com/aida/AP1WRLsohvXA3kRAEypTA7pHEy65QfjeG0oVA5OmoICjesblsBeEqn2VitrF35KreuzAGaY6sLlHWQmIy9BPMVgkgjMCbPFqzZSL_YU-64DwETGGXTI43UIA8GaM6vccfqgEybdhjFrM0Q9_3-7vyfcVNuoovOtY6I4875GHcslRwU9E1gSY_QVwFeLbQ1GEHHqWWctoVXs7h_XaQ9UOVhlRm78JN3wCKL1_-iyhA6PWKROrAkn-NikwYznmweID",
  proofAhmad: "https://lh3.googleusercontent.com/aida/AP1WRLsM9KymJ6MJhGhDCMtmTExCJbOR6qAtGnjtTj16QWkszhJiBJNrVQbuT267pK62NpamK4_Akxh1GOxaARBYa4eYoLN234qQhJz7wCD64IfIJpVoruqR6Kgj_ysxm39v7h0-Fa3T0s0ZWTwk8le0OK8rymlTp2BNR9SlarDAJxBJp3pv1KqOGjitwTHAAp0CuuLEl6R1fIOl9-Mqwy38TqmH_njJZjmPNAD1obOA9wDAc8lhx4l2b3MbU_92",
  proofSiti: "https://lh3.googleusercontent.com/aida/AP1WRLvknEpjCMCbM4n4qyUCpMI1yRULnDbUyXDkeVhl6YWE-ayA0mU_kXuW6Pf4avzkXJtSE3fHNt6fylm8cORpbx6Ud9y8FGK8Q7zpVQ6VcFzOD24g7Q0Ldi9eTM8EHt4xnGpQWXtdovw5uIXFEbhimdJ15pHxkD1ZEwaSPDJEqyra7uogWUGiuO9ZR-qd4Nzt_ik-jt6SnVIkIf25UNs2NABCrDJGAYXdE0WwV1guDxsWFvYCeG1-hRvqafY",
  proofBudi: "https://lh3.googleusercontent.com/aida/AP1WRLC9-ZUA_CsY40JdG3SUVvuIqbaDFBIbYMssmYrDiY3ToXVDKvlpsJxpWiKSSz6ydJJ05oUll8vABf43q3Cv5P7msNOfSzjPkUfeN5DkaGe2rJz0ql2ZOa_NS0vb--kuH6dubuSoArT5fhxijsU3ouXlfAUjo_DH-DjULQLXL83jOasLqb-H8tAYhbzop-p0lZ8Fbn8ajJDx1SK_t08hyDdECHFuS9xEGqDhaGa1RfZxpq3OZLeRr45CiDz"
};

const INITIAL_COURTS: Court[] = [
  {
    id: "court-langsa-utama",
    name: "Arena Langsa Utama",
    type: "Sintetis",
    location: "Langsa Barat, Aceh",
    locationDetail: "Pancoran Soccer Field",
    pricePerHour: 120000,
    rating: 4.8,
    image: ASSETS.court1
  },
  {
    id: "court-unsam",
    name: "UNSAM Sports Center",
    type: "Vinyl",
    location: "Kampus Meurandeh",
    locationDetail: "Meurandeh Main Hall",
    pricePerHour: 150000,
    rating: 4.9,
    image: ASSETS.court2
  },
  {
    id: "court-langsa-town",
    name: "Langsa Town Square",
    type: "Sintetis",
    location: "Pusat Kota Langsa",
    locationDetail: "Rooftop Arena B",
    pricePerHour: 100000,
    rating: 4.7,
    image: ASSETS.court3
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "booking-ahmad",
    courtId: "court-langsa-utama",
    courtName: "Main Arena A (Vinyl)",
    courtType: "Vinyl",
    venueName: "Pancoran Soccer Field",
    userName: "Ahmad Rifqi",
    email: "rifqi@example.com",
    date: "2024-10-24",
    time: "19:00",
    duration: 2,
    courtPrice: 150000,
    uniqueCode: 432,
    totalPrice: 150432,
    status: "PENDING",
    proofUrl: ASSETS.proofAhmad,
    proofName: "ahmad_receipt.jpg",
    createdAt: "2024-10-23T18:30:00Z"
  },
  {
    id: "booking-siti",
    courtId: "court-unsam",
    courtName: "Rooftop Pitch B (Turf)",
    courtType: "Sintetis",
    venueName: "UNSAM Sports Center",
    userName: "Siti Sholiha",
    email: "siti@example.com",
    date: "2024-10-24",
    time: "16:00",
    duration: 1,
    courtPrice: 150000,
    uniqueCode: 122,
    totalPrice: 150122,
    status: "PENDING",
    proofUrl: ASSETS.proofSiti,
    proofName: "siti_transfer.jpg",
    createdAt: "2024-10-23T19:15:00Z"
  },
  {
    id: "booking-budi",
    courtId: "court-langsa-town",
    courtName: "Standard Court C",
    courtType: "Sintetis",
    venueName: "Langsa Town Square",
    userName: "Budi Nugraha",
    email: "budi.n@example.com",
    date: "2024-10-25",
    time: "08:00",
    duration: 2,
    courtPrice: 100000,
    uniqueCode: 299,
    totalPrice: 200299,
    status: "PENDING",
    proofUrl: ASSETS.proofBudi,
    proofName: "budi_screenshot.png",
    createdAt: "2024-10-23T20:45:00Z"
  }
];

export default function App() {
  // Navigation & Views
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  // Core App states
  const [courts, setCourts] = useState<Court[]>(INITIAL_COURTS);
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('futsalkita_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Booking process states
  const [selectedCourt, setSelectedCourt] = useState<Court>(INITIAL_COURTS[0]);
  const [selectedDate, setSelectedDate] = useState<string>("2024-10-15");
  const [selectedTime, setSelectedTime] = useState<string>("18:00");
  const [selectedCourtCol, setSelectedCourtCol] = useState<number>(1); // Court 1, 2 or 3 in schedule
  
  // Create Booking transaction values
  const [currentBookingPrice, setCurrentBookingPrice] = useState<number>(250000);
  const [uniqCode, setUniqCode] = useState<number>(432);

  // Filters for scheduling
  const [filterType, setFilterType] = useState<{ sintetis: boolean; vinyl: boolean }>({
    sintetis: true,
    vinyl: true
  });
  const [priceLimit, setPriceLimit] = useState<number>(250000);

  // User input simulation (the authenticated player is John Doe)
  const playerProfile = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    initials: "JD"
  };

  // Upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search court bar state
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Bank Copy Alert
  const [copied, setCopied] = useState<boolean>(false);

  // Image Preview Modal overlay in Admin Dashboard
  const [previewingProofUrl, setPreviewingProofUrl] = useState<string | null>(null);

  // Live countdown timer for checkout
  const [countdownSeconds, setCountdownSeconds] = useState<number>(24 * 60 * 60);

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('futsalkita_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Countdown clock loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownSeconds(prev => (prev > 0 ? prev - 1 : 24 * 60 * 60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Utility to count active bookings
  const pendingCount = bookings.filter(b => b.status === 'PENDING').length;
  const approvedTotalRevenue = bookings
    .filter(b => b.status === 'APPROVED')
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const approvedBookingsCount = bookings.filter(b => b.status === 'APPROVED').length;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handler: Book slot action
  const handleSelectSlot = (time: string, courtCol: number, isBooked: boolean) => {
    if (isBooked) return;
    setSelectedTime(time);
    setSelectedCourtCol(courtCol);
    // Custom prices based on court type to match visuals
    const calculatedPrice = courtCol === 2 ? 150000 : 120000;
    setCurrentBookingPrice(calculatedPrice);
  };

  // Proceed to check slot / details
  const handleProceedToSlotSelection = (court: Court) => {
    setSelectedCourt(court);
    setSelectedCourtCol(court.type === 'Vinyl' ? 2 : 1);
    setCurrentBookingPrice(court.pricePerHour);
    setActiveView('schedule');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLanjutKePembayaran = () => {
    // Generate a secure customized code for transfer verification
    const randomCode = Math.floor(100 + Math.random() * 899);
    setUniqCode(randomCode);
    setUploadedFile(null);
    setUploadedFileUrl("");
    setActiveView('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // File drop and manual select handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setUploadedFileUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      setUploadedFileUrl(URL.createObjectURL(file));
    }
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    setUploadedFileUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Submit payment upload proof
  const handleKirimBuktiPembayaran = () => {
    // Add dynamic booking to queue
    const courtColName = `Court ${selectedCourtCol} (${selectedCourtCol === 2 ? 'Vinyl' : 'Sintetis'})`;
    const newBooking: Booking = {
      id: "booking-" + Date.now(),
      courtId: selectedCourt.id,
      courtName: `${selectedCourt.name} - ${courtColName}`,
      courtType: selectedCourtCol === 2 ? 'Vinyl' : 'Sintetis',
      venueName: selectedCourt.name,
      userName: playerProfile.name,
      email: playerProfile.email,
      date: selectedDate,
      time: selectedTime,
      duration: 1,
      courtPrice: currentBookingPrice,
      uniqueCode: uniqCode,
      totalPrice: currentBookingPrice + uniqCode,
      status: 'PENDING',
      proofUrl: uploadedFileUrl || ASSETS.proofAhmad, // Fallback placeholder if no image supplied
      proofName: uploadedFile ? uploadedFile.name : "bukti_transfer_manual.jpg",
      createdAt: new Date().toISOString()
    };

    setBookings([newBooking, ...bookings]);
    setUploadedFile(null);
    setUploadedFileUrl("");
    setActiveView('my-bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin approvals & rejections
  const handleApproveBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'APPROVED' } : b));
  };

  const handleRejectBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'REJECTED' } : b));
  };

  // Checks if a designated slot is currently occupied (booked)
  const isSlotBooked = (date: string, time: string, courtCol: number) => {
    // Find matching date, time and courtCol label "Court X"
    return bookings.some(b => 
      b.date === date && 
      b.time === time && 
      b.courtName.includes(`Court ${courtCol}`) &&
      b.status === 'APPROVED'
    );
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans relative antialiased selection:bg-secondary-container">
      
      {/* Floaty Demo Controls Toggle Bar */}
      <div className="bg-primary text-white py-2 px-4 shadow-md sticky top-0 z-[110] flex items-center justify-between text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
          <span className="hidden sm:inline">Mode Interaktif Demostrasi Real-time:</span>
          <span className="bg-white/15 px-2 py-0.5 rounded text-[11px] text-secondary-container">Local Storage Terhubung</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsAdminView(false);
              setActiveView('home');
            }}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${!isAdminView ? 'bg-secondary-container text-on-secondary-container font-extrabold shadow-sm' : 'hover:bg-white/10'}`}
          >
            Sisi Pelanggan (Pemesan)
          </button>
          <button
            onClick={() => {
              setIsAdminView(true);
              setActiveView('admin');
            }}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${isAdminView ? 'bg-secondary-container text-on-secondary-container font-extrabold shadow-sm' : 'hover:bg-white/10'}`}
          >
            Sisi Admin ({pendingCount} Perlu Verif)
          </button>
        </div>
      </div>

      {/* RENDER VIEW ACCORDING TO STATE */}
      {!isAdminView ? (
        <>
          {/* TopNavBar */}
          <header className="bg-surface sticky top-[36px] z-[100] shadow-sm border-b border-outline-variant transition-all">
            <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
              <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setActiveView('home')}
              >
                <img alt="FutsalKita Logo" className="h-[38px] w-auto" src={ASSETS.logo} />
                <span className="font-extrabold text-2xl tracking-tight text-primary-container hidden sm:inline select-none">FutsalKita</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8 font-semibold text-sm">
                <button 
                  onClick={() => setActiveView('home')}
                  className={`transition-colors cursor-pointer ${activeView === 'home' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  Find Courts
                </button>
                <button 
                  onClick={() => setActiveView('my-bookings')}
                  className={`transition-colors cursor-pointer ${activeView === 'my-bookings' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  My Bookings
                  {bookings.filter(b => b.userName === playerProfile.name).length > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 bg-primary-container text-white text-[10px] rounded-full">
                      {bookings.filter(b => b.userName === playerProfile.name).length}
                    </span>
                  )}
                </button>
                <a className="text-on-surface-variant hover:text-primary transition-colors cursor-not-allowed text-xs opacity-70" href="#" onClick={e => e.preventDefault()}>Tournament</a>
                <a className="text-on-surface-variant hover:text-primary transition-colors cursor-not-allowed text-xs opacity-70" href="#" onClick={e => e.preventDefault()}>Rules</a>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:block relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-outline" />
                  <input 
                    className="pl-9 pr-4 py-1.5 bg-surface-container-low border-none rounded-full text-xs focus:ring-2 focus:ring-primary/20 w-48 lg:w-64" 
                    placeholder="Search courts..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <button className="p-1 hover:bg-surface-container rounded-full relative">
                    <Bell className="h-5 w-5 text-on-surface" />
                    {pendingCount > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>}
                  </button>
                </div>
                <div 
                  className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container text-sm shadow-inner cursor-pointer"
                  onClick={() => setActiveView('my-bookings')}
                  title="View My Bookings"
                >
                  {playerProfile.initials}
                </div>
              </div>
            </nav>
          </header>

          <main className="flex-grow">
            {/* 1. HOME VIEW */}
            {activeView === 'home' && (
              <div className="animate-fadeIn">
                {/* Hero Section */}
                <section className="relative min-h-[75vh] flex items-center overflow-hidden hero-gradient pt-8 pb-16">
                  <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="flex flex-col space-y-6">
                      <div className="inline-flex items-center bg-secondary-container text-on-secondary-fixed-variant px-4 py-1.5 rounded-full w-fit gap-2 shadow-xs">
                        <ShieldCheck className="h-4 w-4 text-on-secondary-container" />
                        <span className="font-semibold text-xs tracking-wide">Partner Resmi Universitas Samudra</span>
                      </div>
                      
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-none">
                        Booking Lapangan Futsal <span className="text-secondary bg-clip-text">Mudah, Cepat &amp; Transparan</span>
                      </h1>
                      
                      <p className="text-base sm:text-lg text-on-surface-variant max-w-xl">
                        Temukan lapangan futsal terbaik di sekitarmu, cek jadwal real-time, dan lakukan pembayaran instan hanya dalam beberapa klik. Keringat lebih, ribet kurang.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <button 
                          onClick={() => handleProceedToSlotSelection(courts[0])}
                          className="bg-primary text-on-primary px-8 py-3.5 rounded-xl font-bold hover:opacity-95 transition-all shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Booking Sekarang
                          <ArrowRight className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedCourt(courts[0]);
                            setActiveView('schedule');
                          }}
                          className="bg-surface-container-lowest text-primary border border-outline-variant px-6 py-3.5 rounded-xl font-bold hover:bg-surface-container transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <Map className="h-4 w-4" />
                          Lihat Map
                        </button>
                      </div>

                      <div className="flex items-center gap-12 pt-6 border-t border-outline-variant/30">
                        <div className="flex flex-col">
                          <span className="text-3xl font-extrabold text-primary">50+</span>
                          <span className="text-xs text-on-surface-variant font-medium">Lapangan</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-3xl font-extrabold text-primary">12k+</span>
                          <span className="text-xs text-on-surface-variant font-medium">Pengguna</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-3xl font-extrabold text-primary">4.9/5</span>
                          <span className="text-xs text-on-surface-variant font-medium">Rating</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative hidden lg:block">
                      <div className="absolute -top-6 -right-6 w-64 h-64 bg-secondary-container/30 rounded-full blur-3xl"></div>
                      <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-primary-container/10 rounded-full blur-3xl"></div>
                      
                      <img 
                        alt="Premium Futsal Court" 
                        className="relative z-10 rounded-3xl shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-all duration-700 object-cover aspect-[4/3] w-full" 
                        src={ASSETS.heroImage} 
                      />
                    </div>
                  </div>
                  
                  {/* Decorative Pitch Line Metaphors */}
                  <div className="absolute bottom-0 right-0 w-1/3 h-1/2 opacity-10 pointer-events-none border-l-4 border-t-4 border-primary-container rounded-tl-[100px]"></div>
                </section>

                {/* Keunggulan Section */}
                <section className="py-20 bg-surface-bright pitch-pattern">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                      <h2 className="text-3xl font-bold tracking-tight text-primary mb-3">Keunggulan FutsalKita</h2>
                      <p className="text-sm text-on-surface-variant max-w-xl mx-auto">Sistem manajemen lapangan paling canggih untuk memudahkan pengalaman bermain futsal Anda.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Feature 1 */}
                      <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xs border border-outline-variant/30 hover:border-primary/40 transition-all group hover:-translate-y-1">
                        <div className="w-14 h-14 bg-primary-container/10 rounded-xl flex items-center justify-center text-primary-container mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <Clock className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-primary mb-2">Cek Jadwal Real-time</h3>
                        <p className="text-sm text-on-surface-variant leading-relaxed">Tidak perlu lagi menelepon satu per satu. Cek ketersediaan slot waktu secara instan langsung dari ponsel Anda.</p>
                      </div>

                      {/* Feature 2 */}
                      <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xs border border-outline-variant/30 hover:border-primary/40 transition-all group hover:-translate-y-1">
                        <div className="w-14 h-14 bg-secondary-container/20 rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-on-secondary-fixed transition-all duration-300">
                          <CreditCard className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-primary mb-2">Pembayaran Online</h3>
                        <p className="text-sm text-on-surface-variant leading-relaxed">Berbagai metode pembayaran mulai dari E-wallet, Transfer Bank, hingga QRIS. Aman, cepat, dan transparan.</p>
                      </div>

                      {/* Feature 3 */}
                      <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xs border border-outline-variant/30 hover:border-primary/40 transition-all group hover:-translate-y-1">
                        <div className="w-14 h-14 bg-primary-container/10 rounded-xl flex items-center justify-center text-primary-container mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <Bell className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-primary mb-2">Notifikasi Otomatis</h3>
                        <p className="text-sm text-on-surface-variant leading-relaxed">Dapatkan pengingat jadwal booking dan konfirmasi pembayaran secara otomatis via WhatsApp dan Email.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Popular Courts Grid */}
                <section className="py-20 bg-surface-container-low border-t border-outline-variant/30">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                      <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-primary mb-2">Lapangan Terpopuler</h2>
                        <p className="text-sm text-on-surface-variant">Pilihan lapangan terbaik dengan fasilitas lengkap dan lokasi strategis untuk pertandingan tim Anda.</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full border border-outline flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="w-10 h-10 rounded-full border border-outline flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {courts
                        .filter(court => court.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((court, index) => (
                          <div 
                            key={court.id}
                            className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-xs border border-outline-variant/20 court-card-hover transition-all duration-300"
                          >
                            <div className="relative h-60 overflow-hidden">
                              <img 
                                alt={court.name} 
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                                src={court.image} 
                              />
                              <div className="absolute top-4 left-4 bg-primary/95 text-white px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide shadow-sm">
                                {court.type}
                              </div>
                              <div className="absolute bottom-4 right-4 bg-white/95 text-primary px-3 py-1.5 rounded-xl font-extrabold text-sm shadow-md flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 text-secondary fill-secondary" />
                                {court.rating}
                              </div>
                            </div>

                            <div className="p-6">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-extrabold text-primary tracking-tight">{court.name}</h3>
                                <span className="text-xs bg-secondary-container/30 text-on-secondary-container px-2.5 py-0.5 rounded-full font-bold">Tersedia</span>
                              </div>

                              <div className="flex items-center gap-1.5 text-on-surface-variant mb-6 text-xs font-medium">
                                <MapPin className="h-3.5 w-3.5 text-outline" />
                                <span>{court.location}</span>
                              </div>

                              <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30">
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase font-bold text-outline">Mulai dari</span>
                                  <span className="text-lg font-extrabold text-primary">
                                    Rp {(court.pricePerHour / 1000)}k<small className="text-xs font-normal text-on-surface-variant">/jam</small>
                                  </span>
                                </div>
                                <button 
                                  onClick={() => handleProceedToSlotSelection(court)}
                                  className="bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-white px-5 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                                >
                                  Cek Slot
                                </button>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>

                    <div className="mt-12 text-center">
                      <button 
                        onClick={() => {
                          setSearchQuery("");
                          handleProceedToSlotSelection(courts[0]);
                        }}
                        className="bg-surface-container text-primary border border-outline-variant/40 hover:bg-outline-variant px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 mx-auto cursor-pointer"
                      >
                        Lihat Semua Lapangan
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </section>

                {/* Banner CTA */}
                <section className="py-20 relative overflow-hidden bg-primary-container text-center">
                  <div className="absolute inset-0 bg-primary-container z-0 opacity-95"></div>
                  <div className="absolute inset-0 opacity-10 pitch-pattern z-0"></div>
                  <div className="max-w-4xl mx-auto px-6 relative z-10 text-on-primary-container space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Siap Untuk Bertanding Hari Ini?</h2>
                    <p className="text-sm sm:text-base text-primary-fixed max-w-xl mx-auto font-medium">
                      Gabung dengan ribuan pemain lainnya dan nikmati kemudahan booking lapangan futsal di kota Anda.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                      <button 
                        onClick={() => handleProceedToSlotSelection(courts[0])}
                        className="bg-secondary-container text-on-secondary-fixed-variant hover:bg-secondary hover:text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-all cursor-pointer"
                      >
                        Daftar Sekarang
                      </button>
                      <button 
                        onClick={() => {
                          setIsAdminView(true);
                          setActiveView('admin');
                        }}
                        className="bg-transparent text-white border border-white/30 hover:bg-white/10 px-8 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
                      >
                        Portal Admin Control
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* 2. COURT SCHEDULER VIEW */}
            {activeView === 'schedule' && (
              <div className="animate-fadeIn max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar: Filters */}
                <aside className="lg:col-span-3 space-y-6">
                  <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs border border-outline-variant">
                    <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-secondary" /> 
                      Filter Pencarian
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Court Type Checkboxes */}
                      <div>
                        <label className="text-xs uppercase font-bold tracking-wider text-on-surface-variant block mb-3">Tipe Lapangan</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2.5 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              checked={filterType.sintetis}
                              onChange={(e) => setFilterType({ ...filterType, sintetis: e.target.checked })}
                              className="w-4 h-4 rounded border-outline text-primary focus:ring-secondary-container"
                            />
                            <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">Sintetis (Rumput Buatan)</span>
                          </label>
                          <label className="flex items-center gap-2.5 cursor-pointer group">
                            <input 
                              type="checkbox"
                              checked={filterType.vinyl}
                              onChange={(e) => setFilterType({ ...filterType, vinyl: e.target.checked })}
                              className="w-4 h-4 rounded border-outline text-primary focus:ring-secondary-container"
                            />
                            <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">Vinyl (Karet Indoor)</span>
                          </label>
                        </div>
                      </div>

                      {/* Price Range Slider */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs uppercase font-bold tracking-wider text-on-surface-variant block">Harga per Jam</label>
                          <span className="text-xs font-bold text-primary">Max: Rp {priceLimit / 1000}k</span>
                        </div>
                        <input 
                          className="w-full h-1.5 bg-surface-container-high rounded-full appearance-none accent-primary cursor-pointer" 
                          max="300000" 
                          min="100000" 
                          step="20000" 
                          type="range"
                          value={priceLimit}
                          onChange={(e) => setPriceLimit(Number(e.target.value))}
                        />
                        <div className="flex justify-between mt-1.5 text-[10px] font-semibold text-on-surface-variant">
                          <span>Rp 100k</span>
                          <span>Rp 300k</span>
                        </div>
                      </div>

                      {/* Date Selector */}
                      <div>
                        <label className="text-xs uppercase font-bold tracking-wider text-on-surface-variant block mb-2">Tanggal Main</label>
                        <input 
                          className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2 text-sm font-semibold text-primary focus:ring-2 focus:ring-primary/20 focus:outline-hidden" 
                          type="date" 
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <button 
                      onClick={() => alert("Filter Berhasil Diterapkan ke pencarian")}
                      className="w-full mt-6 bg-primary text-white py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      Terapkan Filter
                    </button>
                  </div>

                  <div className="rounded-2xl overflow-hidden shadow-xs h-40 relative border border-outline-variant">
                    <img className="w-full h-full object-cover" src={ASSETS.sidebarPitchImg} alt="Pitch side" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col justify-end p-4">
                      <span className="text-[10px] uppercase font-bold text-secondary-container">Venue Favorit</span>
                      <p className="text-white font-extrabold text-sm">{selectedCourt.name}</p>
                    </div>
                  </div>
                </aside>

                {/* Center Core: Grid JADWAL LAPANGAN */}
                <section className="lg:col-span-6 space-y-6">
                  <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs border border-outline-variant">
                    
                    {/* Schedule Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-outline-variant/40 mb-6 gap-3">
                      <div>
                        <h1 className="text-2xl font-black text-primary tracking-tight">Jadwal Lapangan</h1>
                        <p className="text-xs text-on-surface-variant">Klik slot waktu kosong untuk memesan</p>
                      </div>
                      
                      {/* Color indicator annotations */}
                      <div className="flex items-center gap-3 text-xs font-semibold">
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-secondary-container border border-secondary"></div>
                          <span className="text-[10px] text-on-surface-variant">Pilihanmu</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-white border border-outline-variant"></div>
                          <span className="text-[10px] text-on-surface-variant">Kosong</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-error-container border border-error/20"></div>
                          <span className="text-[10px] text-on-surface-variant font-medium">Booked</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Interactive Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[480px] border-separate border-spacing-2">
                        <thead>
                          <tr>
                            <th className="w-16"></th>
                            <th className="p-3 bg-surface-container rounded-xl text-center">
                              <span className="block font-bold text-primary text-sm">Court 1</span>
                              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Sintetis</span>
                            </th>
                            <th className="p-3 bg-surface-container rounded-xl text-center">
                              <span className="block font-bold text-primary text-sm">Court 2</span>
                              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Vinyl</span>
                            </th>
                            <th className="p-3 bg-surface-container rounded-xl text-center">
                              <span className="block font-bold text-primary text-sm">Court 3</span>
                              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Sintetis</span>
                            </th>
                          </tr>
                        </thead>
                        
                        <tbody>
                          {[
                            "08:00", "09:00", "10:00", "11:00", "12:00", 
                            "13:00", "14:00", "15:00", "16:00", "17:00", 
                            "18:00", "19:00", "20:00", "21:00", "22:00"
                          ].map(time => {
                            return (
                              <tr key={time}>
                                <td className="text-[11px] font-bold text-on-surface-variant text-right pr-3 align-middle py-2">
                                  {time}
                                </td>
                                
                                {[1, 2, 3].map(colId => {
                                  // Determine status: selected / currently booked (approved or dynamic booked) / available
                                  const isBooked = isSlotBooked(selectedDate, time, colId);
                                  const isSelected = selectedTime === time && selectedCourtCol === colId;
                                  
                                  let cellClass = "border text-center rounded-xl py-3 text-xs font-bold cursor-pointer transition-all active:scale-95 ";
                                  if (isBooked) {
                                    cellClass += "bg-error-container/80 text-on-error-container border-error-container cursor-not-allowed";
                                  } else if (isSelected) {
                                    cellClass += "bg-secondary-container text-on-secondary-fixed border-secondary-fixed ring-3 ring-secondary-container/40";
                                  } else {
                                    cellClass += "bg-white text-on-surface-variant border-outline-variant hover:border-primary hover:bg-surface-container-low";
                                  }

                                  return (
                                    <td 
                                      key={colId} 
                                      className={cellClass}
                                      onClick={() => handleSelectSlot(time, colId, isBooked)}
                                    >
                                      {isBooked ? (
                                        <span className="text-[9px] tracking-wide font-extrabold uppercase text-red-700">Booked</span>
                                      ) : isSelected ? (
                                        <div className="flex items-center justify-center gap-1.5 text-on-secondary-container">
                                          <CheckCircle className="h-3.5 w-3.5" />
                                          <span>Rp {colId === 2 ? '150k' : '120k'}</span>
                                        </div>
                                      ) : (
                                        <span className="text-xs text-on-surface-variant font-semibold">
                                          Rp {colId === 2 ? '150k' : '120k'}
                                        </span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* Right Sidebar: Booking Summary Panel */}
                <aside className="lg:col-span-3">
                  <div className="sticky top-[100px] bg-primary-container text-white p-6 rounded-2xl shadow-lg border border-primary/20 space-y-6">
                    <div>
                      <h3 className="text-xl font-extrabold text-secondary-fixed mb-1 tracking-tight">Booking Summary</h3>
                      <p className="text-xs text-primary-fixed">Selesaikan rincian pesanan anda</p>
                    </div>

                    <div className="space-y-4">
                      {/* Venue info */}
                      <div className="flex justify-between items-start pb-4 border-b border-white/10">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-primary-fixed block mb-0.5">Lapangan</span>
                          <p className="font-extrabold text-sm">{selectedCourt.name}</p>
                          <p className="text-[11px] text-primary-fixed/80">Court {selectedCourtCol} ({selectedCourtCol === 2 ? 'Vinyl' : 'Sintetis'})</p>
                        </div>
                        <div className="bg-secondary-fixed/20 p-2 rounded-lg text-secondary-fixed">
                          <Activity className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Date n Time info */}
                      <div className="flex justify-between items-start pb-4 border-b border-white/10">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-primary-fixed block mb-0.5">Tanggal &amp; Jam</span>
                          <p className="font-extrabold text-sm">
                            {new Date(selectedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                          <p className="text-[11px] text-primary-fixed/80">{selectedTime} - {parseInt(selectedTime) + 1}:00 (1 Jam)</p>
                        </div>
                        <div className="bg-secondary-fixed/20 p-2 rounded-lg text-secondary-fixed">
                          <CalendarDays className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Pricing total */}
                      <div className="flex justify-between items-center py-2 h-14">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-primary-fixed block">Total Tarif</span>
                          <p className="text-2xl font-black text-secondary-fixed">
                            Rp {currentBookingPrice.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <button 
                        onClick={handleLanjutKePembayaran}
                        className="w-full bg-secondary-fixed text-on-secondary-fixed py-3.5 rounded-xl font-extrabold text-sm shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                      >
                        Lanjut ke Pembayaran
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <p className="text-center text-[10px] text-primary-fixed/60">Sudah termasuk PPN 11% &amp; biaya admin.</p>
                    </div>
                  </div>
                </aside>
              </div>
            )}

            {/* 3. PAYMENT GATEWAY VIEW */}
            {activeView === 'payment' && (
              <div className="animate-fadeIn max-w-5xl mx-auto px-6 py-10">
                {/* Steps tracker badge */}
                <section className="mb-10">
                  <div className="flex items-center justify-between max-w-lg mx-auto">
                    <div className="flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => setActiveView('schedule')}>
                      <div className="w-9 h-9 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-on-surface-variant">Jadwal</span>
                    </div>
                    <div className="h-0.5 bg-primary-fixed-dim flex-1 mx-4"></div>
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm ring-4 ring-secondary-container/30">
                        2
                      </div>
                      <span className="text-xs font-black text-primary">Pembayaran</span>
                    </div>
                    <div className="h-0.5 bg-outline-variant flex-grow mx-4"></div>
                    <div className="flex flex-col items-center gap-1.5 opacity-40">
                      <div className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <span className="text-xs font-semibold text-on-surface-variant">Selesai</span>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Bank account transfer details */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Countdown Timer Alert banner */}
                    <div className="bg-primary-container text-white p-6 rounded-2xl flex items-center justify-between shadow-md relative overflow-hidden">
                      <div className="relative z-10">
                        <h2 className="text-lg font-black text-white leading-tight">Selesaikan Pembayaran</h2>
                        <p className="text-xs text-primary-fixed/95">Segera lakukan transfer sebelum waktu habis</p>
                      </div>
                      <div className="text-right relative z-10">
                        <div className="text-3xl font-black text-secondary-fixed tracking-tight scale-105 duration-1000">
                          {formatCountdown(countdownSeconds)}
                        </div>
                        <p className="text-[9px] uppercase tracking-wider text-primary-fixed/60 font-bold font-mono">Sisa Waktu</p>
                      </div>
                      <div className="absolute right-0 -bottom-8 opacity-5">
                        <Clock className="w-32 h-32" />
                      </div>
                    </div>

                    {/* Account transfer instructions bento card */}
                    <div className="bg-surface-container-lowest border border-outline-variant p-6 sm:p-8 rounded-2xl shadow-xs">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-primary">Informasi Rekening Transfer</h3>
                        <div className="bg-surface-container px-3 py-1 rounded-full flex items-center gap-1.5">
                          <img alt="BNI Logo" className="h-4" src={ASSETS.bniLogo} />
                          <span className="text-xs font-bold text-primary">Bank BNI</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Account Number Box */}
                        <div className="flex justify-between items-center p-4 bg-surface-container-low rounded-xl border border-outline-variant/40">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">Nomor Rekening</p>
                            <p className="text-xl sm:text-2xl font-black tracking-widest text-primary" id="acc-number">
                              9876 543 210
                            </p>
                          </div>
                          <button 
                            className="flex items-center gap-1.5 text-secondary hover:text-primary font-bold text-xs bg-white py-1.5 px-3 rounded-lg shadow-xs border border-outline-variant transition-colors cursor-pointer"
                            onClick={() => copyToClipboard('9876 543 210')}
                          >
                            {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Clipboard className="h-3.5 w-3.5" />} 
                            {copied ? 'Tersalin' : 'Salin'}
                          </button>
                        </div>

                        {/* Recipient Name Box */}
                        <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/40">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-0.5">Nama Penerima</p>
                          <p className="font-extrabold text-sm text-primary uppercase">PT FUTSAL KITA JAYA</p>
                        </div>

                        {/* Exact Money Total */}
                        <div className="flex justify-between items-center p-4 bg-secondary-container/10 rounded-xl border border-secondary-container/30">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider font-bold text-on-secondary-fixed-variant">Total Pembayaran</p>
                            <p className="text-2xl font-black text-secondary">
                              Rp {(currentBookingPrice + uniqCode).toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] bg-secondary-container text-on-secondary-container px-3 py-1 rounded-lg font-bold shadow-xs">
                              ID: #{uniqCode} (Kode Unik)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 border-l-4 border-primary bg-primary/5 rounded-r-xl">
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          Mohon transfer tepat hingga <strong className="text-primary font-bold">3 digit terakhir (Rp {uniqCode})</strong> untuk mempermudah proses verifikasi otomatis oleh sistem verifikasi kami.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Upload receipts proof & Booking meta */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Drag n Drop Upload Area */}
                    <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl shadow-xs">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold text-primary">Upload Bukti Transfer</h3>
                        <span className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-0.5 rounded-full text-[10px] font-bold">
                          <Clock className="h-3 w-3" />
                          Verifikasi Manual
                        </span>
                      </div>

                      {/* Drop Area Box */}
                      <div 
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-outline-variant rounded-2xl p-6 text-center bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer group"
                      >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-105 transition-transform text-primary">
                          <Upload className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-bold text-primary">Klik atau seret foto bukti ke sini</p>
                        <p className="text-[11px] text-on-surface-variant mt-1">Mendukung file JPG, PNG (Maks 5MB)</p>
                        
                        <input 
                          type="file" 
                          className="hidden" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </div>

                      {/* Preview component */}
                      {uploadedFileUrl && (
                        <div className="mt-4 p-3 bg-surface-container rounded-xl border border-outline-variant flex items-center gap-3 animate-fadeIn">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant">
                            <img className="w-full h-full object-cover" src={uploadedFileUrl} alt="Preview proof" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-xs font-bold truncate text-primary">{uploadedFile ? uploadedFile.name : 'bukti_transfer.jpg'}</p>
                            <p className="text-[9px] text-green-700 font-bold">Siap untuk diupload</p>
                          </div>
                          <button 
                            className="p-1 hover:bg-red-50 text-error rounded-full"
                            onClick={removeUploadedFile}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      <button 
                        onClick={handleKirimBuktiPembayaran}
                        className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary-container shadow-md cursor-pointer transition-all active:scale-[0.98]"
                      >
                        Kirim Bukti Pembayaran
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Ticket details summary card */}
                    <div className="bg-surface-container border border-outline-variant p-6 rounded-2xl relative overflow-hidden">
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary-container/20 rounded-full blur-2xl"></div>
                      <h4 className="text-[10px] font-bold text-outline uppercase tracking-wider mb-4">Detail Pesanan</h4>
                      
                      <div className="flex gap-4 mb-4 relative z-10">
                        <img 
                          alt="Court thumbnail" 
                          className="w-16 h-16 rounded-xl object-cover shadow-sm border border-white" 
                          src={ASSETS.courtThumb} 
                        />
                        <div>
                          <h4 className="font-extrabold text-sm text-primary tracking-tight">Stadium Elite A - Vinyl</h4>
                          <p className="text-xs text-on-surface-variant font-medium">{selectedCourt.name}</p>
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-outline-variant/40 pt-4 text-xs font-semibold">
                        <div className="flex justify-between">
                          <span className="text-on-surface-variant">Tanggal Main</span>
                          <span className="text-primary font-bold">{selectedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-on-surface-variant">Jam Main</span>
                          <span className="text-primary font-bold">{selectedTime} - {parseInt(selectedTime) + 1}:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-on-surface-variant">Tarif Lapangan</span>
                          <span className="text-primary font-bold">Rp {currentBookingPrice.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-on-surface-variant">Kode Unik Transfer</span>
                          <span className="text-primary font-bold">Rp {uniqCode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. PLAYER MY BOOKINGS VIEW */}
            {activeView === 'my-bookings' && (
              <div className="animate-fadeIn max-w-4xl mx-auto px-6 py-10 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-black text-primary tracking-tight">Booking Saya</h1>
                    <p className="text-xs text-on-surface-variant">Kelola dan pantau status transaksi pemesanan lapangan anda</p>
                  </div>
                  <button 
                    onClick={() => handleProceedToSlotSelection(courts[0])}
                    className="bg-primary hover:bg-primary-container text-white py-2 px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Booking Lapangan Lagi
                  </button>
                </div>

                <div className="space-y-4">
                  {bookings.filter(b => b.userName === playerProfile.name).length === 0 ? (
                    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-12 text-center">
                      <Calendar className="h-10 w-10 text-outline mx-auto mb-3" />
                      <p className="text-sm font-bold text-primary">Belum Ada Transaksi</p>
                      <p className="text-xs text-on-surface-variant mt-1 mb-4">Anda belum memiliki riwayat reservasi.</p>
                      <button 
                        onClick={() => handleProceedToSlotSelection(courts[0])}
                        className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Mulai Booking Sekarang
                      </button>
                    </div>
                  ) : (
                    bookings
                      .filter(b => b.userName === playerProfile.name)
                      .map((booking) => (
                        <div 
                          key={booking.id}
                          className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary/20 transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-primary/5 p-3 rounded-xl text-primary">
                              <Activity className="h-6 w-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-extrabold text-sm text-primary tracking-tight">{booking.courtName}</h3>
                                {booking.status === 'PENDING' && (
                                  <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                                    Konfirmasi Bukti Transfer
                                  </span>
                                )}
                                {booking.status === 'APPROVED' && (
                                  <span className="bg-green-100 text-green-800 border border-green-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                                    <Check className="h-3 w-3" /> Tersertifikasi &amp; Lunas
                                  </span>
                                )}
                                {booking.status === 'REJECTED' && (
                                  <span className="bg-red-100 text-red-800 border border-red-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                                    Format Salah/Ditolak
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-semibold text-on-surface-variant mt-1 flex items-center gap-1">
                                <CalendarDays className="h-3 w-3" />
                                {booking.date} @ {booking.time} ({booking.duration} Jam)
                              </p>
                              <p className="text-[11px] text-outline mt-0.5">Dikirim: {new Date(booking.createdAt).toLocaleString('id-ID')}</p>
                            </div>
                          </div>

                          <div className="flex md:flex-col justify-between items-end w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-outline-variant/40">
                            <div className="text-left md:text-right">
                              <span className="text-[10px] uppercase font-bold text-outline">Total Bayar</span>
                              <p className="text-sm font-extrabold text-primary">Rp {booking.totalPrice.toLocaleString('id-ID')}</p>
                            </div>
                            
                            <div className="text-right mt-1.5 flex gap-2">
                              {booking.status === 'PENDING' && (
                                <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/50 flex items-center gap-1">
                                  Sedang diverifikasi admin FutsalKita
                                </span>
                              )}
                              {booking.status === 'APPROVED' && (
                                <span className="text-[10px] text-green-700 font-bold bg-green-50 px-2.5 py-1 rounded-md border border-green-200/50 flex items-center gap-1">
                                  Lunas - Datang bawa bukti ini
                                </span>
                              )}
                              {booking.status === 'REJECTED' && (
                                <button 
                                  onClick={() => {
                                    setUploadedFile(null);
                                    setActiveView('payment');
                                  }}
                                  className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 py-1 px-3 rounded-md transition-colors"
                                >
                                  Upload Ulang Bukti
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="bg-primary-container text-white py-12 mt-auto border-t border-primary/20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-3">
                  <img alt="FutsalKita Logo" className="h-10 w-auto brightness-0 invert" src={ASSETS.logo} />
                  <span className="font-extrabold text-2xl text-secondary-container">FutsalKita</span>
                </div>
                <p className="text-sm text-primary-fixed/80 max-w-sm leading-relaxed">
                  Platform booking lapangan futsal terpercaya. Bagian dari ekosistem digital Universitas Samudra / UNSAM untuk mendukung gaya hidup sehat mahasiswa dan masyarakat umum.
                </p>
                <div className="flex items-center gap-2 pt-2 text-[11px] text-primary-fixed/50 font-bold">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Sistem Autentikasi Keamanan Enkripsi SSL
                </div>
              </div>

              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-secondary-container font-extrabold text-xs uppercase tracking-wider mb-4">Produk</h4>
                  <ul className="space-y-2 text-xs text-primary-fixed/80">
                    <li><a className="hover:text-white transition-colors" href="#">Cari Lapangan</a></li>
                    <li><a className="hover:text-white transition-colors animate-pulse text-secondary-fixed" href="#">Turnamen Kampus</a></li>
                    <li><a className="hover:text-white transition-colors" href="#">Fasilitas Member</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-secondary-container font-extrabold text-xs uppercase tracking-wider mb-4">Perusahaan</h4>
                  <ul className="space-y-2 text-xs text-primary-fixed/80">
                    <li><a className="hover:text-white transition-colors" href="#">Tentang Kami</a></li>
                    <li><a className="hover:text-white transition-colors" href="#">Karir Akademik</a></li>
                    <li><a className="hover:text-white transition-colors" href="#">Partner Resmi</a></li>
                  </ul>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <h4 className="text-secondary-container font-extrabold text-xs uppercase tracking-wider mb-4">Bantuan</h4>
                  <ul className="space-y-2 text-xs text-primary-fixed/80">
                    <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
                    <li><a className="hover:text-white transition-colors" href="#">Terms of Service</a></li>
                    <li><a className="hover:text-white transition-colors" href="#">Hubungi Admin</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-primary-fixed/60">
              <span>© 2026 FutsalKita Universitas Samudra. All rights reserved.</span>
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span>Designed for performant sports utility.</span>
              </div>
            </div>
          </footer>
        </>
      ) : (
        /* ==================== 5. ADMIN DASHBOARD VIEW ==================== */
        <div className="min-h-screen bg-surface-container-low flex flex-col md:flex-row animate-fadeIn">
          
          {/* Sidebar Left Navigation Panel */}
          <aside className="w-full md:w-64 bg-surface-container border-r border-outline-variant flex flex-col p-4 space-y-4">
            
            {/* Identity */}
            <div className="flex items-center gap-3 px-2 py-4 border-b border-outline-variant/40">
              <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-secondary-container shadow-sm">
                <SlidersHorizontal className="h-5 w-5 text-secondary-container" />
              </div>
              <div>
                <h1 className="font-extrabold text-lg text-primary tracking-tight leading-none">FutsalKita</h1>
                <p className="text-[10px] uppercase font-bold text-outline tracking-wider">Central Dashboard</p>
              </div>
            </div>

            {/* Links */}
            <nav className="flex-grow space-y-1 py-4">
              <button 
                onClick={() => setActiveView('admin')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${activeView === 'admin' ? 'bg-secondary-container text-on-secondary-container shadow-xs' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Ringkasan Dashboard</span>
              </button>
              
              <button 
                onClick={() => setActiveView('admin')}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container-high text-xs transition-all cursor-pointer"
              >
                <Activity className="h-4 w-4 text-outline" />
                <span>Kelola Lapangan</span>
              </button>
              
              <button 
                onClick={() => setActiveView('admin')}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container-high text-xs transition-all cursor-pointer relative"
              >
                <CreditCard className="h-4 w-4 text-outline" />
                <span>Verifikasi Pembayaran</span>
                {pendingCount > 0 && (
                  <span className="absolute right-3 bg-red-600 text-white text-[9px] px-2 py-0.2 rounded-full font-black">
                    {pendingCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => alert("Mengunduh excel laporan bulanan...")}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container-high text-xs transition-all cursor-pointer"
              >
                <FileText className="h-4 w-4 text-outline" />
                <span>Ekspor Laporan</span>
              </button>
              
              <button 
                onClick={() => setActiveView('admin')}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container-high text-xs transition-all cursor-pointer"
              >
                <Users className="h-4 w-4 text-outline" />
                <span>Database Pengguna</span>
              </button>
            </nav>

            {/* Quick action button */}
            <div className="pt-4 border-t border-outline-variant/30">
              <button 
                onClick={() => {
                  const newName = prompt("Masukkan nama lapangan baru:", "Standard Court D");
                  if (newName) {
                    const newCourt: Court = {
                      id: "court-" + Date.now(),
                      name: newName,
                      type: "Vinyl",
                      location: "Langsa Timur, Aceh",
                      locationDetail: "Futsal Center Hall",
                      pricePerHour: 130000,
                      rating: 4.5,
                      image: ASSETS.courtThumb
                    };
                    setCourts([...courts, newCourt]);
                    alert("Lapangan " + newName + " berhasil didaftarkan!");
                  }
                }}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <PlusCircle className="h-4 w-4" />
                Tambah Lapangan Baru
              </button>
            </div>

            {/* Bottom Footer block inside Admin workspace */}
            <div className="pt-4 border-t border-outline-variant/30 space-y-1">
              <button 
                onClick={() => alert("Pengaturan system integrasi aktif.")}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container-high cursor-pointer text-left"
              >
                <Settings className="h-4 w-4 text-outline" />
                Pengaturan
              </button>
              <button 
                onClick={() => {
                  setIsAdminView(false);
                  setActiveView('home');
                }}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-error hover:bg-red-50 cursor-pointer text-left"
              >
                <LogOut className="h-4 w-4" />
                Keluar Mode Admin
              </button>
            </div>
          </aside>

          {/* Main Console Canvas body */}
          <main className="flex-grow p-6 space-y-6">
            
            {/* Header segment inside Admin */}
            <header className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs border border-outline-variant/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-black text-primary tracking-tight">Dashboard Overview</h2>
                <p className="text-xs text-on-surface-variant">Konfirmasi verifikasi pembayaran, pantau okupansi, dan manage reservasi.</p>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0 hidden sm:block">
                  <input 
                    className="bg-surface-container-high border-none rounded-full px-5 py-2 w-64 text-xs font-semibold focus:ring-2 focus:ring-secondary focus:outline-hidden" 
                    placeholder="Search data..." 
                    type="text"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-on-surface-variant" />
                </div>
                
                <div className="flex items-center gap-3 bg-surface-container px-3 py-1.5 rounded-xl border border-outline-variant">
                  <div className="relative">
                    <img alt="Admin avatar picture" className="w-8 h-8 rounded-full border-2 border-secondary object-cover" src={ASSETS.avatar} />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary">Administrator</p>
                    <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-wider">Super User</p>
                  </div>
                </div>
              </div>
            </header>

            {/* Key Metrics Stats Row */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stat Card 1: Booked count */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs flex items-center gap-6 hover:shadow-md transition-shadow">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary shrink-0">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Disetujui (Lunas)</p>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-3xl font-black text-primary font-mono">{1284 + approvedBookingsCount}</span>
                    <span className="text-green-600 font-bold text-[10px] mb-1 flex items-center">
                      <TrendingUp className="h-3.5 w-3.5" /> +12%
                    </span>
                  </div>
                </div>
              </div>

              {/* Stat Card 2: Pending count action required */}
              <div className="bg-primary-container p-6 rounded-2xl shadow-md flex items-center gap-6 text-white shrink-0">
                <div className="p-4 bg-secondary-container rounded-2xl text-on-secondary-container shrink-0">
                  <BadgeAlert className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-primary-fixed uppercase tracking-wider">Verifikasi Pending</p>
                  <div className="flex items-end gap-3 mt-1">
                    <span className="text-3xl font-black text-white font-mono">{pendingCount}</span>
                    <span className="bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full text-[9px] font-bold">
                      Butuh Konfirmasi
                    </span>
                  </div>
                </div>
              </div>

              {/* Stat Card 3: Total Revenue calculated dynamically */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs flex items-center gap-6 hover:shadow-md transition-shadow">
                <div className="p-4 bg-secondary/10 rounded-2xl text-secondary shrink-0">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Perkiraan Omset</p>
                  <div className="flex items-end gap-2 mt-1 font-mono">
                    <span className="text-xl sm:text-2xl font-black text-primary">
                      Rp {((45200000 + approvedTotalRevenue) / 1000000).toFixed(2)}jt
                    </span>
                    <span className="text-green-600 font-bold text-[10px] mb-1 flex items-center">
                      <TrendingUp className="h-3.5 w-3.5" /> +5.4%
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Verifikasi Pembayaran queue segment */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-xs overflow-hidden">
              <div className="p-6 border-b border-outline-variant/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold text-primary tracking-tight">Antrean Verifikasi Manual</h3>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setBookings(INITIAL_BOOKINGS);
                      alert("Antrean reset ke data awal!");
                    }}
                    className="bg-surface-container hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
                  >
                    Reset Simulasi Data
                  </button>
                  <button 
                    onClick={() => {
                      alert("Tabel disinkronisasi ulang secara real-time!");
                    }}
                    className="bg-primary hover:bg-primary-container px-4 py-2 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    Refresh Sync
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      <th className="px-6 py-3 font-bold text-xs uppercase text-on-surface-variant">User / Pelanggan</th>
                      <th className="px-6 py-3 font-bold text-xs uppercase text-on-surface-variant">Lapangan Target</th>
                      <th className="px-6 py-3 font-bold text-xs uppercase text-on-surface-variant">Waktu Pesanan</th>
                      <th className="px-6 py-3 font-bold text-xs uppercase text-on-surface-variant text-center">Bukti Transfer</th>
                      <th className="px-6 py-3 font-bold text-xs uppercase text-on-surface-variant text-center">Status Lunas</th>
                      <th className="px-6 py-3 font-bold text-xs uppercase text-on-surface-variant text-right">Verifikasi Tindakan</th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-outline-variant/50">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-surface-container-low/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container text-xs">
                              {booking.userName.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-primary">{booking.userName}</p>
                              <p className="text-[10px] text-on-surface-variant">{booking.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-xs font-bold text-primary">
                          {booking.courtName}
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-xs font-bold text-primary">{booking.date}</p>
                          <p className="text-[10px] text-on-surface-variant">{booking.time} - {parseInt(booking.time) + 1}:00</p>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            <button 
                              className="relative group border border-outline-variant rounded-lg overflow-hidden w-16 h-10 shadow-xs cursor-zoom-in"
                              onClick={() => {
                                setPreviewingProofUrl(booking.proofUrl || ASSETS.proofAhmad);
                              }}
                              title="Klik untuk memperbesar bukti transfer"
                            >
                              <img 
                                className="w-full h-full object-cover group-hover:opacity-80 transition-all" 
                                src={booking.proofUrl || ASSETS.proofAhmad} 
                                alt="Proof thumbnail" 
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Eye className="h-4 w-4 text-white" />
                              </div>
                            </button>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex justify-center">
                            {booking.status === 'PENDING' && (
                              <span className="bg-amber-50 text-amber-800 border border-amber-200/50 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                                Pending Verif
                              </span>
                            )}
                            {booking.status === 'APPROVED' && (
                              <span className="bg-green-100 text-green-800 border border-green-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                                APPROVED / LUNAS
                              </span>
                            )}
                            {booking.status === 'REJECTED' && (
                              <span className="bg-red-100 text-red-800 border border-red-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                                REJECTED / TOLAK
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {booking.status === 'PENDING' ? (
                              <>
                                <button 
                                  onClick={() => handleApproveBooking(booking.id)}
                                  className="bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-white px-3 py-1.5 rounded-lg text-[11px] font-black cursor-pointer transition-all active:scale-95"
                                >
                                  Setujui
                                </button>
                                <button 
                                  onClick={() => handleRejectBooking(booking.id)}
                                  className="bg-error-container text-on-error-container hover:bg-red-700 hover:text-white px-3 py-1.5 rounded-lg text-[11px] font-black cursor-pointer transition-all active:scale-95"
                                >
                                  Tolak
                                </button>
                              </>
                            ) : (
                              <span className="text-[10px] font-extrabold text-outline check-circle italic flex items-center gap-1">
                                <Check className="h-3 w-3" /> Selesai Diverifikasi
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between text-xs font-semibold text-on-surface-variant">
                <span>Menampilkan {bookings.length} baris reservasi dari database</span>
                <div className="flex gap-1.5">
                  <button className="w-7 h-7 rounded border border-outline-variant bg-white text-primary flex items-center justify-center opacity-45 cursor-not-allowed" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="w-7 h-7 rounded bg-primary text-white flex items-center justify-center text-xs">
                    1
                  </button>
                  <button className="w-7 h-7 rounded border border-outline-variant bg-white text-primary flex items-center justify-center cursor-not-allowed">
                    2
                  </button>
                  <button className="w-7 h-7 rounded border border-outline-variant bg-white text-primary flex items-center justify-center opacity-45 cursor-not-allowed" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Quick overview layout details bottom */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reports metadata lists */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant">
                <h4 className="font-extrabold text-base text-primary mb-4">Quick Reports</h4>
                
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-xl flex items-center justify-between border border-outline-variant/30">
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary/15 p-2 rounded-xl text-secondary">
                        <CalendarDays className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-primary">Daily Occupancy Rate</p>
                        <p className="text-[9px] text-on-surface-variant font-bold uppercase">Rataan Penjadwalan</p>
                      </div>
                    </div>
                    <span className="text-lg font-black text-secondary">86%</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl flex items-center justify-between border border-outline-variant/30">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-xl text-primary">
                        <Star className="h-5 w-5 fill-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-primary">Rataan Rating Lapangan</p>
                        <p className="text-[9px] text-on-surface-variant font-bold uppercase">Feedback Mahasiswa</p>
                      </div>
                    </div>
                    <span className="text-lg font-black text-primary">4.8</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert("Laporan penuh diunduh.")}
                  className="w-full mt-6 py-2.5 bg-surface-container-highest hover:bg-outline-variant text-primary font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Download Laporan Lengkap
                </button>
              </div>

              {/* Real time court slots quick statuses */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-extrabold text-base text-primary">Live Status Lapangan</h4>
                  <span className="bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase animate-pulse">
                    Live Monitor
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 flex-grow">
                  <div className="bg-white p-4 rounded-xl border-l-4 border-green-500 shadow-xs flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-outline">Court A (Vinyl)</p>
                    <p className="font-black text-xs text-primary uppercase">TERSEDIA</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border-l-4 border-orange-500 shadow-xs flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-outline">Court B (Rumput)</p>
                    <p className="font-black text-xs text-primary uppercase">SEDANG MAIN</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border-l-4 border-green-500 shadow-xs flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-outline">Court C (Vinyl)</p>
                    <p className="font-black text-xs text-primary uppercase">TERSEDIA</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-xs flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-outline">Court D (VIP)</p>
                    <p className="font-black text-xs text-primary uppercase">MINTENANCE</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}

      {/* Proof Viewer Overlay lightbox modal */}
      {previewingProofUrl && (
        <div className="fixed inset-0 bg-black/75 z-[200] flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full p-4 relative space-y-4">
            <button 
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-primary p-1.5 rounded-full z-10 cursor-pointer"
              onClick={() => setPreviewingProofUrl(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-base font-extrabold text-primary border-b pb-2">Pratinjau Bukti Transfer Pembayaran</h3>
            <div className="bg-surface-container rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              <img className="max-h-96 max-w-full object-contain" src={previewingProofUrl} alt="Payment proof zoomed" />
            </div>
            <div className="flex justify-end pt-2">
              <button 
                className="bg-primary hover:bg-primary-container text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
                onClick={() => setPreviewingProofUrl(null)}
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

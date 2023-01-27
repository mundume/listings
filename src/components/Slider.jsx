import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { collection, getDocs, orderBy, limit, query } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "./Spinner";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const Slider = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  console.log(listings);

  return (
    listings && (
      <div>
        <p className="text-4xl font-semibold">Recomended</p>
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div className="relative">
                <img
                  src={data.imageUrls[0]}
                  alt=""
                  className="h-60 w-full  rounded object-cover"
                />
                <div className="absolute left-0 top-1/2 p-2 text-white bg-gray-900 opacity-70">
                  <p className="text-lg font-bold ">{data.name}</p>
                  <p className="tex-sm font-normal">{data.address}</p>
                  <p className="tex-sm font-bold">
                    $ {data.regularPrice} {data.type === "rent" && "/ month"}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};
export default Slider;

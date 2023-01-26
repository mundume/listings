import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import ShareIcon from "../assets/svg/shareIcon.svg";

const Listings = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      {/* slider */}
      <div
        className="shareIconDiv"
        onClick={() => {
          window.navigator.clipboard.writeText(window.location.href);
          setShareLink(true);
          setTimeout(() => {
            setShareLink(false);
          }, 2000);
        }}
      >
        <img src={ShareIcon} alt="" />
      </div>
      {shareLink && <p className="linkCopied">Link Copied</p>}
      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - ${" "}
          {listing.offer ? listing.discountedaPrice : listing.regularPrice}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === "rent" ? "Rent" : "Sale"}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            $ {listing.regularPrice - listing.discountedaPrice} discount
          </p>
        )}
        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1 ? `${listing.bedrooms}Bedrooms` : "1 Bedroom"}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bedrooms}Bathrooms`
              : "1 Bathroom"}
          </li>
          <li>{listing.parking ? "Parking Available" : "No Parking"}</li>
          <li>{listing.furnished && "Furnished"}</li>
        </ul>
        <p className="listingLocationTitle">Location</p>
        {/* mP */}
        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className="primaryButton"
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
};

export default Listings;

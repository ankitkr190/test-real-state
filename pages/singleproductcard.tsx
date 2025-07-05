import React from 'react';
import SingleProductCard from '../components/ChatSections/SingleProductCard';

const TestSingleProductCard = () => {
  // Real estate test data based on your sample
  const realEstateData = [
    {
      budget: "2",
      ebook_url: "https://www.richyplace2002.com/E-Brochur/THE%20RICH%20VILLE%20RATCHAPHRUEK/mobile/index.html",
      location: "Ratchaphruek Road, Aom Kret Subdistrict, Pak Kret District, Nonthaburi Province",
      map_img: "https://www.richy.co.th/assets/uploads/9da09-map-racha.jpg",
      project_area: "20-0-78.8 Rai",
      project_images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop"
      ],
      project_name: "TheRichVilleRatchaphruekRattanathibet",
      project_owner: "Richy Place 2002 Public Co.,Ltd",
      realestate_type: "Home",
      room_area: "Usable area 117.96 - 180 sq.m.",
      room_id: "26",
      richyLink: "https://www.richy.co.th/en/project/home/TheRichVilleRatchaphruekRattanathibet"
    },
    {
      budget: "3",
      ebook_url: "https://www.richyplace2002.com/E-Brochur/SUKHUMVIT_RESIDENCE/mobile/index.html",
      location: "Sukhumvit Road, Khlong Toei Subdistrict, Khlong Toei District, Bangkok",
      map_img: "https://www.richy.co.th/assets/uploads/sukhumvit-map.jpg",
      project_area: "15-2-45.5 Rai",
      project_images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=400&fit=crop"
      ],
      project_name: "SukhumvitLuxuryResidence",
      project_owner: "Richy Place 2002 Public Co.,Ltd",
      realestate_type: "Condo",
      room_area: "Usable area 85.50 - 125.75 sq.m.",
      room_id: "15",
      richyLink: "https://www.richy.co.th/en/project/condo/SukhumvitLuxuryResidence"
    },
    {
      budget: "1.5-2.5 million baht",
      ebook_url: "https://www.richyplace2002.com/E-Brochur/RIVERSIDE_VILLA/mobile/index.html",
      location: "Riverside Road, Bang Pho Subdistrict, Tak Fa District, Nakhon Sawan Province",
      map_img: "https://www.richy.co.th/assets/uploads/riverside-map.jpg",
      project_images: [
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=400&h=400&fit=crop"
      ],
      project_name: "RiversideVillaRetreat",
      project_owner: "Richy Place 2002 Public Co.,Ltd",
      realestate_type: "Villa",
      room_area: "Usable area 200.50 - 280.25 sq.m.",
      room_id: "08",
      richyLink: "https://www.richy.co.th/en/project/villa/RiversideVillaRetreat"
    },
    {
      budget: "4-6 million baht",
      ebook_url: "https://www.richyplace2002.com/E-Brochur/DOWNTOWN_TOWER/mobile/index.html",
      location: "Silom Road, Suriyawong Subdistrict, Bang Rak District, Bangkok",
      map_img: "https://www.richy.co.th/assets/uploads/downtown-map.jpg",
      project_area: "8-1-22.3 Rai",
      project_images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1515263487990-61b07816b64d?w=400&h=400&fit=crop"
      ],
      project_name: "DowntownLuxuryTower",
      project_owner: "Richy Place 2002 Public Co.,Ltd",
      realestate_type: "High-rise Condo",
      room_area: "Usable area 65.80 - 150.90 sq.m.",
      room_id: "42",
      richyLink: "https://www.richy.co.th/en/project/condo/DowntownLuxuryTower"
    },
    {
      budget: "2.8-3.5 million baht",
      ebook_url: "https://www.richyplace2002.com/E-Brochur/GARDEN_HOMES/mobile/index.html",
      location: "Phetkasem Road, Hua Hin Subdistrict, Hua Hin District, Prachuap Khiri Khan Province",
      map_img: "https://www.richy.co.th/assets/uploads/garden-map.jpg",
      project_area: "25-3-12.7 Rai",
      project_images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop"
      ],
      project_name: "GardenHomesHuaHin",
      project_owner: "Richy Place 2002 Public Co.,Ltd",
      realestate_type: "Townhome",
      room_area: "Usable area 145.20 - 195.75 sq.m.",
      room_id: "33",
      richyLink: "https://www.richy.co.th/en/project/townhome/GardenHomesHuaHin"
    }
  ];

  // Convert real estate data to SingleProductCard format
  const testProducts = realEstateData.map(property => ({
    name: property.project_name.replace(/([A-Z])/g, ' $1').trim(),
    brand: property.project_owner,
    image: property.project_images,
    price: property.budget,
    details: `${property.realestate_type} • ${property.room_area} • Located at ${property.location}`,
    link: property.richyLink
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Real Estate SingleProductCard Test Page
        </h1>        

        {/* Grid layout for cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {testProducts.map((product, index) => (
            <SingleProductCard
              key={index}
              name={product.name}
              brand={product.brand}
              image={product.image}
              price={product.price}
              details={product.details}
              link={product.link}
            />
          ))}
        </div>                
      </div>
    </div>
  );
};

export default TestSingleProductCard;

// import express from 'express'
import axios from 'axios';
// const app=express()

const db = [
    {
      "_id": "1",
      "location": "New Delhi",
      "distance": "5 km",
      "contact": "9999888777",
      "imageLink": "https://www.winger-tatamotors.com/images/multi-purpose-vehicle/tata-winger-ambulance/overview/Ambulance.png",
      "Driver name": "Rajesh Sharma"
    },
    {
      "_id": "2",
      "location": "Noida",
      "distance": "8 km",
      "contact": "9888776655",
      "imageLink": "https://s3.youthkiawaaz.com/wp-content/uploads/2021/05/18152531/Indian-Ambulance-FB.jpg",
      "Driver name": "Amit Kumar"
    },
    {
      "_id": "3",
      "location": "Gurugram",
      "distance": "15 km",
      "contact": "7777888999",
      "imageLink": "https://www.shutterstock.com/image-photo/new-delhi-india-april-21-260nw-1962550975.jpg",
      "Driver name": "Vikram Singh"
    },
    {
      "_id": "4",
      "location": "Faridabad",
      "distance": "10 km",
      "contact": "6666777888",
      "imageLink": "https://content.jdmagicbox.com/comp/pauri/d8/9999p1368.1368.210610114552.r8d8/catalogue/singh-ambulance-service-kotdwara-ac-ambulance-services-4yrgs11c6t-250.jpg",
      "Driver name": "Sunita Rani"
    },
    {
      "_id": "5",
      "location": "Ghaziabad",
      "distance": "12 km",
      "contact": "5555666777",
      "imageLink": "https://content.jdmagicbox.com/comp/allahabad/u7/0532px532.x532.190601145953.s4u7/catalogue/l-r-t-icu-ambulance-service-rajapur-allahabad-24-hours-ambulance-services-1cw6bio0lt-250.jpg",
      "Driver name": "Rajiv Patel"
    },
    {
      "_id": "6",
      "location": "Agra",
      "distance": "50 km",
      "contact": "4444555566",
      "imageLink": "https://content.jdmagicbox.com/comp/birbhum/w2/9999p3462.3462.220214201014.d6w2/catalogue/asif-ambulance-service-birbhum-birbhum-8le1vm7qfd-250.jpg",
      "Driver name": "Pooja Verma"
    },
    {
      "_id": "7",
      "location": "Kanpur",
      "distance": "120 km",
      "contact": "3333444455",
      "imageLink": "https://content.jdmagicbox.com/comp/siliguri/x9/9999px353.x353.200731210015.k3x9/catalogue/mukherjee-critical-care-ambulance-service-hill-cart-road-siliguri-ambulance-services-hqjtaqjxhj-250.jpg",
      "Driver name": "Suresh Yadav"
    },
    {
      "_id": "8",
      "location": "Lucknow",
      "distance": "150 km",
      "contact": "2222333344",
      "imageLink": "https://5.imimg.com/data5/CJ/WE/FX/SELLER-3525736/ambulance.jpeg",
      "Driver name": "Neha Gupta"
    },
    {
      "_id": "9",
      "location": "Varanasi",
      "distance": "200 km",
      "contact": "1111222233",
      "imageLink": "https://image.isu.pub/180421180326-b7fcd141e78a0805387c31a2804aacfe/jpg/page_1_thumb_large.jpg",
      "Driver name": "Manoj Kumar"
    },
    {
      "_id": "10",
      "location": "Bhopal",
      "distance": "250 km",
      "contact": "9999777755",
      "imageLink": "https://content.jdmagicbox.com/v2/comp/bardhaman/j1/9999px342.x342.241022133202.v3j1/catalogue/apamynqi6ckvimi-2d80epnpvg.jpg",
      "Driver name": "Arun Mishra"
    },
    {
      "_id": "11",
      "location": "Indore",
      "distance": "300 km",
      "contact": "8888666655",
      "imageLink": "https://content.jdmagicbox.com/comp/tirupur/p4/9999px421.x421.181226071902.n8p4/catalogue/win-ambulance-gandhinagar-tirupur-ambulance-services-sjrvofaily.jpg?clr=",
      "Driver name": "Ravi Sharma"
    },
    {
      "_id": "12",
      "location": "Jabalpur",
      "distance": "350 km",
      "contact": "7777776655",
      "imageLink": "https://c8.alamy.com/comp/KRX9R4/ambulance-parked-in-downtown-new-delhi-india-KRX9R4.jpg",
      "Driver name": "Anita Verma"
    },
    {
      "_id": "13",
      "location": "Patna",
      "distance": "400 km",
      "contact": "6666664455",
      "imageLink": "https://content.jdmagicbox.com/comp/morbi/a9/9999p2822.2822.180630125038.c7a9/catalogue/hiren-d-raval-shakat-sanala-morbi-ambulance-services-3dufdmbwqn.jpg",
      "Driver name": "Rahul Yadav"
    },
    {
      "_id": "14",
      "location": "Ranchi",
      "distance": "450 km",
      "contact": "5555553355",
      "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-7VIjLO0BfK2FfGIG1yRSyVxyN3wM-n2YVw&s",
      "Driver name": "Priya Kumari"
    },
    {
      "_id": "15",
      "location": "Surat",
      "distance": "500 km",
      "contact": "4444442244",
      "imageLink": "https://content.jdmagicbox.com/comp/rajkot/s5/0281px281.x281.190726104714.y6s5/catalogue/patidar-ambulance-service-150-feet-ring-road-rajkot-ambulance-services-rl0j91eyeh-250.jpg",
      "Driver name": "Vikas Patel"
    },
    {
      "_id": "16",
      "location": "Ahmedabad",
      "distance": "550 km",
      "contact": "3333331133",
      "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlkXZtGlOaoiNOHMoog3gS0jmZcu-gt4eRn3pbURrdB2IAf7GznBIKotiRaHff2valUIc&usqp=CAU",
      "Driver name": "Sonal Chauhan"
    },
    {
      "_id": "17",
      "location": "Chandigarh",
      "distance": "600 km",
      "contact": "2222220022",
      "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRYLErr63wyNbdVgEekx-wvEJek9Aur1Y4V-u-3dIbCmfpKQA3_ND4xeykPcngroTl-0&usqp=CAU",
      "Driver name": "Harvinder Singh"
    },
    {
      "_id": "18",
      "location": "Shimla",
      "distance": "650 km",
      "contact": "1111119911",
      "imageLink": "https://content.jdmagicbox.com/comp/east-godavari/g1/9999px883.x883.230609201649.j7g1/catalogue/nagesh-ambulance-service-pithapuram-east-godavari-ambulance-services-k0dyw1bw2w.jpg",
      "Driver name": "Anil Kumar"
    },
    {
      "_id": "19",
      "location": "Manali",
      "distance": "700 km",
      "contact": "9999888800",
      "imageLink": "https://content.jdmagicbox.com/comp/chengalpattu/e8/9999pxx44.xx44.161018135913.q1e8/catalogue/indian-ambulance-guduvanchery-chengalpattu-ambulance-services-9zmdmtf.jpg",
      "Driver name": "Rohit Mehta"
    },
    {
      "_id": "20",
      "location": "Meerut",
      "distance": "3 km",
      "contact": "0000999988",
      "imageLink": "https://5.imimg.com/data5/SELLER/Default/2023/7/324381883/HI/GS/TW/2820324/24-hour-ambulance-service-in-all-over-india.jpeg",
      "Driver name": "Ravi Kumar"
    },
    {
      "_id": "21",
      "location": "Dehradun",
      "distance": "750 km",
      "contact": "8888777744",
      "imageLink": "https://medcab.in/assets/blogs/blog_thumbnail1688365832.jpg",
      "Driver name": "Naveen Kumar"
    },
    {
      "_id": "22",
      "location": "Haridwar",
      "distance": "800 km",
      "contact": "7777666633",
      "imageLink": "https://content.jdmagicbox.com/v2/comp/dahod/p5/9999p2673.2673.240323153313.a2p5/catalogue/guru-krupa-icu-ambulance-service-anaj-market-road-dahod-ventilator-ambulance-services-for-outstation-btgr082jug.jpg",
      "Driver name": "Rolando Kisku"
    }
  ]
  




db.map((payload,ind) =>
    axios.post('/api/v1/ambulance/addAmbulance',{
        location: payload.location,
        distance: payload.distance,
        contact_number:payload.contact,
        imageLink: payload.imageLink,
        driver_name:payload['Driver name']
    })
);
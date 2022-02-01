import React from 'react';
import './App.css';
import NewsBlock from './NewsBlock';



function App() {
  return (
    <div>
      <div className="bg-black">
        <NewsBlock date={"01.04.2021"} tags={[{ label: "НОВОСТИ", slug: "#news" }, { label: "РАЗНОЕ", slug: "#others" }]} img={"/img/image-id-1.png"} text={"Макс Фрай в интервью ресурсу AIN.UA: об агентстве, направлениях работы и планах на будущее"} postlink='#!' />
        <NewsBlock date={"29.03.2021"} tags={[{ label: "ПОЛЕЗНОЕ", slug: "#usefull" }]} img={"/img/image-id-2.png"} text={"Как добавить интернет-магазин в Google Shopping и зачем это делать (инструкция)"} postlink='#!' />
        <NewsBlock date={"01.04.2021"} tags={[{ label: "INSIGHTS", slug: "#insights" }]} img={"/img/image-id-3.png"} text={"ІТ-консалтинг для світових корпорацій: історії з життя про підводні камені роботи з топовою healthcare-компанією"} postlink='#!' />
        <NewsBlock date={"29.03.2021"} tags={[{ label: "НОВОСТИ", slug: "#news" }, { label: "РАЗНОЕ", slug: "#others" }]} img={"/img/image-id-1.png"} text={"Макс Фрай в интервью ресурсу AIN.UA: об агентстве, направлениях работы и планах на будущее"} postlink='#!' />
      </div>
    </div>
  )
}

export default App;


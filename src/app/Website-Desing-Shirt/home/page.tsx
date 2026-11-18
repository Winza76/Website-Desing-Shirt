import WhiteShirt3D from "@/src/app/components/WhiteShirt3D";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            ออกแบบเสื้อเชิ้ต 3D (Custom Shirt Studio)
          </h1>
          <p className="text-slate-600">
            หมุนดูรอบตัวเสื้อ 360 องศา พร้อมปรับแต่งสีและลวดลายได้ตามต้องการ
          </p>
        </div>

        {/* แสดงผลโมเดลเสื้อเชิ้ต 3D สีขาว */}
        <WhiteShirt3D />
      </div>
    </main>
  );
}
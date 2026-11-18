"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

// ฟังก์ชันสร้างรูปทรงและชิ้นส่วนของเสื้อเชิ้ต 3D สีขาว
function WhiteShirtModel({ autoRotate = true }: { autoRotate?: boolean }) {
  const shirtGroup = useRef<THREE.Group>(null);

  // แอนิเมชันหมุนเสื้อเบาๆ อัตโนมัติ
  useFrame((_, delta) => {
    if (autoRotate && shirtGroup.current) {
      shirtGroup.current.rotation.y += delta * 0.4;
    }
  });

  // วัสดุผ้าฝ้ายสีขาว (Cotton Fabric Material)
  const fabricMaterial = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    roughness: 0.78, // ความด้านของเนื้อผ้าฝ้าย
    metalness: 0.02,
    side: THREE.DoubleSide,
  });

  // วัสดุกระดุมมุกสีขาวนวล
  const buttonMaterial = new THREE.MeshStandardMaterial({
    color: "#f1f5f9",
    roughness: 0.25,
    metalness: 0.1,
  });

  return (
    <group ref={shirtGroup} position={[0, -0.2, 0]}>
      {/* 1. ลำตัวเสื้อ (Torso) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow material={fabricMaterial}>
        {/* ทรงกระบอกรีแบนเล็กน้อยให้คล้ายลำตัวคน */}
        <cylinderGeometry args={[0.68, 0.72, 1.85, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.78} />
      </mesh>
      {/* ปรับสเกลแกน Z ให้ลำตัวแบนเหมือนเสื้อจริง */}
      <group scale={[1, 1, 0.58]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow material={fabricMaterial}>
          <cylinderGeometry args={[0.72, 0.75, 1.85, 32]} />
        </mesh>

        {/* ช่วงบ่าและหัวไหล่ (Shoulders) */}
        <mesh position={[0, 0.92, 0]} rotation={[0, 0, Math.PI / 2]} castShadow material={fabricMaterial}>
          <capsuleGeometry args={[0.36, 1.15, 16, 32]} />
        </mesh>

        {/* 2. คอปกเสื้อเชิ้ต (Shirt Collar) */}
        <group position={[0, 1.18, 0.05]}>
          {/* ฐานคอปก */}
          <mesh rotation={[0.15, 0, 0]} castShadow material={fabricMaterial}>
            <cylinderGeometry args={[0.32, 0.36, 0.22, 32, 1, true]} />
          </mesh>
          {/* ปกเสื้อด้านซ้าย */}
          <mesh position={[-0.22, 0.02, 0.24]} rotation={[0.45, -0.45, -0.25]} castShadow material={fabricMaterial}>
            <boxGeometry args={[0.28, 0.18, 0.03]} />
          </mesh>
          {/* ปกเสื้อด้านขวา */}
          <mesh position={[0.22, 0.02, 0.24]} rotation={[0.45, 0.45, 0.25]} castShadow material={fabricMaterial}>
            <boxGeometry args={[0.28, 0.18, 0.03]} />
          </mesh>
        </group>

        {/* 3. แขนเสื้อด้านซ้าย (Left Sleeve - แขนสั้น) */}
        <group position={[-0.95, 0.65, 0]} rotation={[0, 0, 0.55]}>
          <mesh castShadow receiveShadow material={fabricMaterial}>
            <cylinderGeometry args={[0.26, 0.23, 0.75, 24]} />
          </mesh>
        </group>

        {/* 4. แขนเสื้อด้านขวา (Right Sleeve - แขนสั้น) */}
        <group position={[0.95, 0.65, 0]} rotation={[0, 0, -0.55]}>
          <mesh castShadow receiveShadow material={fabricMaterial}>
            <cylinderGeometry args={[0.26, 0.23, 0.75, 24]} />
          </mesh>
        </group>

        {/* 5. สาบเสื้อด้านหน้า (Front Placket) */}
        <mesh position={[0, 0.02, 0.74]} castShadow material={fabricMaterial}>
          <boxGeometry args={[0.14, 1.82, 0.04]} />
        </mesh>

        {/* 6. กระเป๋าเสื้ออกซ้าย (Chest Pocket) */}
        <mesh position={[0.35, 0.35, 0.73]} rotation={[0, 0.25, 0]} castShadow material={fabricMaterial}>
          <boxGeometry args={[0.32, 0.36, 0.03]} />
        </mesh>

        {/* 7. กระดุมเสื้อ 6 เม็ดเรียงลงมา (Buttons) */}
        {[0.72, 0.44, 0.16, -0.12, -0.4, -0.68].map((yPos, index) => (
          <mesh
            key={index}
            position={[0, yPos, 0.77]}
            rotation={[Math.PI / 2, 0, 0]}
            material={buttonMaterial}
          >
            <cylinderGeometry args={[0.032, 0.032, 0.015, 16]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Component หลักสำหรับแสดงผลหน้าจอ 3D
export default function WhiteShirt3D() {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-slate-100 to-slate-200 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      {/* ป้ายบอกวิธีใช้งานมุมซ้ายบน */}
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm text-sm text-slate-700">
        <p className="font-semibold">3D White Shirt Preview</p>
        <p className="text-xs text-slate-500">คลิกซ้ายค้างเพื่อหมุน • เลื่อนลูกกลิ้งเพื่อซูม</p>
      </div>

      {/* พื้นที่แสดงผล WebGL Canvas */}
      <Canvas shadows camera={{ position: [0, 0.4, 3.8], fov: 42 }}>
        {/* แสงสว่างโดยรอบ */}
        <ambientLight intensity={0.75} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 3, -4]} intensity={0.4} />

        {/* สภาพแวดล้อมจำลองแสงสะท้อนบนเนื้อผ้า */}
        <Environment preset="studio" />

        {/* โมเดลเสื้อเชิ้ต 3D สีขาว */}
        <WhiteShirtModel autoRotate={true} />

        {/* เงาตกกระทบบนพื้นด้านล่าง */}
        <ContactShadows position={[0, -1.25, 0]} opacity={0.35} scale={6} blur={2.2} />

        {/* ตัวควบคุมการหมุน/ซูมด้วยเมาส์ */}
        <OrbitControls
          enablePan={false}
          minDistance={2.2}
          maxDistance={6}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
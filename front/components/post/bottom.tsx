import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

export default function Bottom() {
  return (
    <button className="flex">
      <Link href="../">
        <GoArrowLeft /> 나가기
      </Link>
    </button>
  )
}
import { Input, Button } from "@material-tailwind/react";

export default function SignUp({ setView }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 gap-2 bg-white">
        <img src={"/images/inflearngram.png"} className="w-60 mb-6" />
        <Input label="email" type="email" className="w-full rounded-sm" />
        <Input label="password" type="password" className="w-full rounded-sm" />
        <Button
          onClick={() => {}}
          color="light-blue"
          className="w-full text-md py-1"
        >
          로그인
        </Button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-gray-400 gap-2 bg-white">
        계정이 없으신가요?{" "}
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView("SIGNUP")}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}

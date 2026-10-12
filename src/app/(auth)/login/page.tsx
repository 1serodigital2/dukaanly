import { Input } from "@/src/components/form/Input";

const LoginPage = () => {
  return (
    <>
      <h1>Dukaanly</h1>
      <form
        action=""
        className="border rounded-lg p-4 flex flex-col gap-3 items-start"
      >
        <div>
          <Input label="Email" type="email" name="email" />
        </div>
        <div>
         <Input label="Password" type="password" name="password" />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default LoginPage;

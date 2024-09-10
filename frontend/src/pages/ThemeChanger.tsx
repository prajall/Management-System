import { Button } from "@/components/ui/button";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

const ThemeChanger = () => {
  const { setTheme } = useContext(ThemeContext);

  return (
    <div className="flex flex-col gap-2 w-full h-screen justify-center items-center">
      <h3 className="font-bold text-5xl text-primary"></h3>
      <p className="text-3xl font-semibold text-primary">Home Page</p>
      <p className="text-3xl font-semibold text-secondary">
        This is a homepage
      </p>
      <Button className="bg-dark">Button</Button> {/* Updated class name */}
      <button
        onClick={() => {
          setTheme("green");
        }}
      >
        Green
      </button>
      <button
        onClick={() => {
          setTheme("blue");
        }}
      >
        Blue
      </button>
      <button
        onClick={() => {
          setTheme("red");
        }}
      >
        Red
      </button>
    </div>
  );
};

export default ThemeChanger;

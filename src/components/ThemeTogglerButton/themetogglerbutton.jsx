import { useContext } from "react";
import { ThemeContext, themes } from "../../contexts/theme-context";
import { Button } from "../Button/index";
import { GrActions } from "react-icons/gr";



export const ThemeTogglerButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div>
      <Button
        onClick={() =>
          setTheme(theme === themes.light ? themes.dark : themes.light)
        }
      >
        <GrActions />
      </Button>
    </div>
  );
};

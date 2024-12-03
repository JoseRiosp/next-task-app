import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/appStore"; // Ajusta la ruta según tu estructura

export const useAppDispatch: () => AppDispatch = useDispatch;

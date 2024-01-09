import IToken from "@/types/Token";
import { createContext } from "react";

const TokenContext = createContext<ITokenContext>({
	token: undefined,
	setToken: (a: IToken) => {},
});

type ITokenContext = {
	token?: IToken;
	setToken: (a: IToken) => any;
};

export default TokenContext;
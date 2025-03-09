import { useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { settingsStore } from "store/settingsStore";

const cacheRtl = createCache({
  key: "rtl",
  prepend: true,
  stylisPlugins: [prefixer, rtlPlugin],
});

const RTLProvider = ({ children }) => {
  const direction = settingsStore((state) => state.direction);

  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  if (direction === "rtl") {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }

  return <>{children}</>;
}

export default RTLProvider;

export default function Namespace(NS) {
  NS = NS.toUpperCase();
  const base_namespace = `${__NAMESPACE__}/${NS}/`;
  function async(method) {
    const base = base_namespace + method.toUpperCase();
    const R = base + '_REQUEST',
          S = base + '_SUCCESS',
          F = base + '_FAILURE';
    return { R, S, F, REQUEST: R, SUCCESS: S, FAILURE: F };
  }
  function sync(method) {
    return base_namespace + method.toUpperCase();
  }
  let ret = [async, sync];
  ret.sync = sync,
  ret.async = async;
  return ret;
}

import { fetchDataPosts } from "@/redux/reducers/posts";
import { AppDispatch } from "@/redux/store";
import useDidMountEffect from "@/utils/customUseEffect";
import { useDispatch } from "react-redux";

export const useFetchPosts = ({ setSpin, setCurrent, current, pageSize, body }: any) => {
  const dispatch: AppDispatch = useDispatch();
  useDidMountEffect(() => {
    current = 1;
  }, [body]);
  useDidMountEffect(() => {
    handleFetchPosts();
  }, [current, body]);
  const handleFetchPosts = () => {
    try {
      if (!body.isReady) {
        return;
      }
      setSpin(true);
      setTimeout(() => {
        setSpin(false);
      }, 500);
      dispatch(
        fetchDataPosts({
          pageSize,
          current,
          keySearch: body.query.keySearch,

          price: body.query.price,
          form: body.query.form,
          sit: body.query.sit,
          fuel: body.query.fuel,
          numberBox: body.query.numberBox,
          city: body.query.city,
          district: body.query.district === "" ? undefined : body.query.district,
          date: body.query.date,
          km: body.query.km,
          color: body.query.color,
          country: body.query.country,
          model: body.query.model,
          brand: body.query.brand,
          status: body.query.status,
          post: body.query.post,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

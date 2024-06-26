import { fetchDataPosts } from "@/redux/reducers/posts";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchPosts = ({ current, pageSize, body, setSpin }: any) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    current = 1;
  }, [body]);
  useEffect(() => {
    handleFetchPosts();
  }, [current, body]);
  const handleFetchPosts = () => {
    try {
      setSpin(true);
      if (!body.isReady) {
        return;
      }
      dispatch(
        fetchDataPosts({
          setSpin,
          pageSize,
          current,
          keySearch: body.query.keySearch === "" ? undefined : body.query.keySearch,
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

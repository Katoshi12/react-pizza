import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import Input from "../components/Base/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Radio from "../components/Base/Radio";
import { Link } from "react-router";
import { routes } from "../routes";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type ProfileData = {
  fullName: string;
  birthday: string;
  gender: string;
}

const formFieldSchema = z.object({
  fullName: z.string().min(1, "ФИО обязательно"),
  birthday: z
    .string()
    .min(1, 'Выберите дату рождения')
    .refine((date) => {
      const birthdayDate = new Date(date);
      const now = new Date();

      const age = now.getFullYear() - birthdayDate.getFullYear();

      const isBeforeBirthdayThisYear = (
        now.getMonth() < birthdayDate.getMonth() ||
        (now.getMonth() === birthdayDate.getMonth() && now.getDate() < birthdayDate.getDate())
      );
      const actualAge = isBeforeBirthdayThisYear ? age - 1 : age;

      return actualAge >= 18
    }, {
      message: "Вам должно быть 18 лет и более",
    }),
  gender: z.enum(["men", "women"], {
    required_error: "Выберите пол",
    invalid_type_error: "Выберите пол",
  }),
});

type FormFields = z.infer<typeof formFieldSchema>

export const ProfilePage: FC = () => {
  const [profileData, setProfileData] = useLocalStorage(
    "profile",
    {
      fullName: "",
      birthday: "",
      gender: ""
    }
  );


  const {
    register,
    handleSubmit,
    formState: {errors}, reset,
  } = useForm<FormFields>({
    resolver: zodResolver(formFieldSchema)
  })

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    setProfileData(data);
    reset();
  };

  return (
    <div className="profile container">
      <div className="profile__top">
        <img
          src="../../public/img/profile.png"
          alt="Профиль пользователя"
          width={ 150 }
          loading="lazy"
        />
        <div className="profile__text">
          <p>{ profileData?.fullName }</p>
          <p>{ profileData?.gender === 'men' ? "Мужской" : 'Женский' }</p>
        </div>
      </div>
      <div className="profile__bottom">

        <form onSubmit={ handleSubmit(onSubmit) } className="profile__form">
          <Input
            label="ФИО"
            id="fullName"
            placeholder="Иванов Иван Иванович"
            { ...register("fullName") }
            error={ !!errors.fullName }
            errorMessage={ errors.fullName?.message }
          />

          <Input
            label="Дата рождения"
            type="date"
            { ...register('birthday') }
            id="birthday"
            error={ !!errors.birthday }
            errorMessage={ errors.birthday?.message }
          />

          <Radio
            id="men"
            value="men"
            { ...register("gender") }
            label="Мужской"
            error={ !!errors.gender }
            errorMessage={ errors.gender?.message }
          />

          <Radio
            id="women"
            value="women"
            { ...register("gender") }
            label="Женский"
            error={ !!errors.gender }
            errorMessage={ errors.gender?.message }
          />

          <div className="action">
            <button
              className="button profile__button "
              type="submit">
              Сохранить изменения
            </button>
            <Link to={ routes.home() }
                  className="button button--outline profile__button"
                  type="submit">
              Вернуться назад
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage;
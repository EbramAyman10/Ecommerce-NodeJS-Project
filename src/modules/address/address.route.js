import { Router } from "express";
import {
  addAddress,
  getLoggedUserAddresses,
  removeAddress,
} from "./address.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addAddressValidation } from "./address.validation.js";

const addressRouter = Router();

addressRouter
  .route("/")
  .patch(
    protectedRoutes,
    allowedTo("user"),
    validate(addAddressValidation),
    addAddress,
  )
  .get(protectedRoutes, getLoggedUserAddresses);

addressRouter
  .route("/:id")
  .delete(protectedRoutes, allowedTo("user"), removeAddress);

export default addressRouter;

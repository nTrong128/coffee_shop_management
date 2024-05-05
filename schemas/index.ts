import * as z from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email().min(6, {
      message: "Tài khoản phải từ 6 ký tự.",
    }),
    username: z
      .string()
      .min(6, {
        message: "Tài khoản phải từ 6 ký tự.",
      })
      .refine(
        (s) => !s.includes(" "),
        "Tên tài khoản không được có khoảng trống!"
      ),
    password: z.string(),
    retype_password: z.string(),
    name: z.string().min(4, {
      message: "Tên phải từ 4 ký tự.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải từ 8 ký tự.",
        path: ["password"],
      });
    }
    if (!data.password.match(/[A-Z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 chữ hoa.",
        path: ["password"],
      });
    }
    if (!data.password.match(/[a-z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 chữ thường.",
        path: ["password"],
      });
    }
    if (!data.password.match(/[0-9]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 số.",
        path: ["password"],
      });
    }
    if (!data.password.match(/[^A-Za-z0-9]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 ký tự đặc biệt.",
        path: ["password"],
      });
    }
    if (data.password !== data.retype_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu không khớp.",
        path: ["retype_password"],
      });
    }
  });

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Vui lòng nhập tài khoản.",
    })
    .refine(
      (s) => !s.includes(" "),
      "Tên tài khoản không được có khoảng trống!"
    ),
  password: z.string().min(1, {
    message: "Vui lòng nhập mật khẩu.",
  }),
});

export const AddUserSchema = z.object({
  name: z.string().min(4, {
    message: "Tên phải từ 4 ký tự.",
  }),
  username: z
    .string()
    .min(6, {
      message: "Tài khoản phải từ 6 ký tự.",
    })
    .refine(
      (s) => !s.includes(" "),
      "Tên tài khoản không được có khoảng trống!"
    ),
  email: z.string().email().min(6, {
    message: "Email phải từ 6 kí tự.",
  }),
  role: z.enum(["USER", "ADMIN"]),
  user_phone: z
    .string()
    .startsWith("0", {
      message: "Số điện thoại phải bắt đầu bằng số 0.",
    })
    .min(10, {
      message: "Số điện thoại phải là 10 ký tự.",
    }),
  user_address: z.string().min(5, {
    message: "Địa chỉ phải từ 5 ký tự.",
  }),
  user_birth: z.string(),
  wage_rate: z.number(),
  password: z.string(),
});

export const UpdateUserSchema = z.object({
  position_id: z.string(),
  name: z.string().min(4, {
    message: "Tên phải từ 4 ký tự.",
  }),
  email: z.string().email().min(6, {
    message: "Email phải từ 6 kí tự.",
  }),
  role: z.enum(["USER", "ADMIN"]),
  user_phone: z
    .string()
    .startsWith("0", {
      message: "Số điện thoại phải bắt đầu bằng số 0.",
    })
    .min(10, {
      message: "Số điện thoại phải là 10 ký tự.",
    }),
  user_address: z.string().min(5, {
    message: "Địa chỉ phải từ 5 ký tự.",
  }),
  user_birth: z.string(),
  wage_rate: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return parseFloat(val);
      }
      return val;
    },
    z.number().min(1.0, {
      message: "Hệ số lương phải lớn hơn hoặc bằng 1.",
    })
  ),
});

export const AddProductTypeSchema = z.object({
  name: z.string().min(3, {
    message: "Tên phải từ 4 ký tự.",
  }),
  desc: z.string().min(10, {
    message: "Mô tả phải từ 10 ký tự.",
  }),
});

export const AddProductSchema = z.object({
  product_name: z.string().min(4, {
    message: "Tên phải từ 4 ký tự.",
  }),
  product_price: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return parseFloat(val);
      }
      return val;
    },
    z.number().min(1000, {
      message: "Giá sản phẩm phải từ 1000đ.",
    })
  ),
  product_desc: z
    .string()
    .min(10, {
      message: "Mô tả phải từ 10 ký tự.",
    })
    .or(z.string().optional()),
  product_type: z.string(),
  product_image: z.string().optional(),
});

export const AddCustomerSchema = z.object({
  customer_name: z.string().min(4, {
    message: "Tên phải từ 4 ký tự.",
  }),
  customer_point: z
    .preprocess((val) => {
      if (typeof val === "string") {
        return parseFloat(val);
      }
      return val;
    }, z.number())
    .optional(),
  customer_phone: z
    .string()
    .startsWith("0", {
      message: "Số điện thoại phải bắt đầu bằng số 0.",
    })
    .min(10, {
      message: "Số điện thoại phải là 10 ký tự.",
    }),
});

export const AddOrderSchema = z.object({
  customer_id: z.string(),
  staff_id: z.string(),
});

export const AddSpendingSchema = z.object({
  spending_name: z.string().min(1, {
    message: "Tên chi tiêu không được để trống.",
  }),
  spending_price: z.preprocess((val) => {
    if (typeof val === "string") {
      return parseFloat(val);
    }
    return val;
  }, z.number()),
  spending_desc: z.string().optional(),
  spending_creator: z.string().optional(),
});

export const ChangePasswordSchema = z
  .object({
    old_password: z.string().min(1, {
      message: "Vui lòng nhập mật khẩu cũ.",
    }),
    new_password: z.string(),
    retype_password: z.string().min(1, {
      message: "Vui lòng nhập lại mật khẩu mới.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.new_password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải từ 8 ký tự.",
        path: ["new_password"],
      });
    }
    if (!data.new_password.match(/[A-Z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 chữ hoa.",
        path: ["new_password"],
      });
    }
    if (!data.new_password.match(/[a-z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 chữ thường.",
        path: ["new_password"],
      });
    }
    if (!data.new_password.match(/[0-9]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 số.",
        path: ["new_password"],
      });
    }
    if (!data.new_password.match(/[^A-Za-z0-9]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 ký tự đặc biệt.",
        path: ["new_password"],
      });
    }
    if (data.new_password !== data.retype_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu không khớp.",
        path: ["retype_password"],
      });
    }
  });

export const UpdatePersonalInformation = z.object({
  name: z.string().min(4, {
    message: "Tên phải từ 4 ký tự.",
  }),
  email: z.string().email().min(6, {
    message: "Email phải từ 6 kí tự.",
  }),
  user_phone: z
    .string()
    .startsWith("0", {
      message: "Số điện thoại phải bắt đầu bằng số 0.",
    })
    .min(10, {
      message: "Số điện thoại phải là 10 ký tự.",
    }),
  user_address: z.string().min(5, {
    message: "Địa chỉ phải từ 5 ký tự.",
  }),
  user_birth: z.string(),
});

export const AddPositionSchema = z.object({
  position_name: z.string().min(1, {
    message: "Tên chức vụ không được để trống.",
  }),
  position_desc: z.string().min(1, {
    message: "Mô tả không được để trống.",
  }),
});

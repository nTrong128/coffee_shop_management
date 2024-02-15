import * as z from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email().min(6, {
      message: "Tài khoản phải từ 6 ký tự.",
    }),
    username: z.string().min(6),
    password: z.string(),
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
  });

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Vui lòng nhập tài khoản.",
  }),
  password: z.string().min(1, {
    message: "Vui lòng nhập mật khẩu.",
  }),
});

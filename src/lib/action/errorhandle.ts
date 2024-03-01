// shopidyError 복붙

export interface ErrorLike {
  status: number;
  message: Error;
  cause?: Error;
}

export const isObject = (
  object: unknown
): object is Record<string, unknown> => {
  return (
    typeof object === "object" && object !== null && !Array.isArray(object)
  );
};

export const isError = (error: unknown): error is ErrorLike => {
  if (!isObject(error)) return false;

  if (error instanceof Error) return true;

  return findError(error);
};

function findError<T extends object>(error: T): boolean {
  if (Object.prototype.toString.call(error) === "[object Error]") {
    return true;
  }

  const prototype = Object.getPrototypeOf(error) as T | null;

  return prototype === null ? false : findError(prototype);
}

interface HttpErrorInterface {
  status: number;
  defaultMessage?: string;
}

export const handleHttpError = async (
  response: Response
): Promise<{ status: number; body: { message: string } }> => {
  const { status } = response;

  const errorResponse = ({ status, defaultMessage }: HttpErrorInterface) => ({
    status,
    body: { message: defaultMessage || `HTTP 오류! 상태 코드: ${status}` },
  });

  switch (status) {
    case 400:
      return errorResponse({
        status,
        defaultMessage: "잘못된 요청입니다.",
      });
    case 401:
      return errorResponse({
        status,
        defaultMessage: "인증에 실패했습니다.",
      });
    case 403:
      return errorResponse({
        status,
        defaultMessage: "접근이 금지되었습니다.",
      });
    case 404:
      return errorResponse({
        status,
        defaultMessage: "요청한 리소스를 찾을 수 없습니다.",
      });
    case 500:
      return errorResponse({
        status,
        defaultMessage: "서버 내부 오류가 발생했습니다.",
      });
    default:
      return errorResponse({ status });
  }
};

from fastapi import HTTPException, Request
from app.core.config import settings
from app.core.redis_client import redis_client


def enforce_rate_limit(request: Request) -> None:
    ip = request.client.host if request.client else "unknown"
    key = f"rate_limit:{ip}"

    try:
        count = redis_client.incr(key)
        if count == 1:
            redis_client.expire(key, 3600)
        ttl = redis_client.ttl(key)
    except Exception:
        # Redis down ho to request block mat karo
        return

    if count > settings.MAX_CALLS_PER_HOUR:
        raise HTTPException(
            status_code=429,
            detail=f"Rate limit exceeded. Try again after {ttl} seconds.",
        )
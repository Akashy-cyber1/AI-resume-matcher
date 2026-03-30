def generate_suggestions(score: int, missing_keywords: list[str]) -> list[str]:
    suggestions = []

    if score < 40:
        suggestions.append("Resume ko JD ke hisaab se strongly tailor karo.")
    elif score < 70:
        suggestions.append("Projects, skills aur impact statements ko aur clearly align karo.")
    else:
        suggestions.append("Resume ka alignment achha hai, bas JD-specific optimization karo.")

    if missing_keywords:
        suggestions.append(
            "In keywords ko natural way me add karne ki koshish karo: " + ", ".join(missing_keywords[:10])
        )

    suggestions.append("Skills section aur project bullets me exact job-related terms use karo.")
    return suggestions
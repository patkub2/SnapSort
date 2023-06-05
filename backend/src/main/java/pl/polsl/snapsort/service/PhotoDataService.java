package pl.polsl.snapsort.service;

import pl.polsl.snapsort.models.PhotoData;

public interface PhotoDataService {
    PhotoData savePhotoData(PhotoData photoData);

    void deletePhotoData(Long photoDataId);

    PhotoData getPhotoDataById(Long photoDataId);
}

package pl.polsl.snapsort.service.impl;

import org.springframework.stereotype.Service;
import pl.polsl.snapsort.models.ThumbnailData;
import pl.polsl.snapsort.repository.ThumbnailDataRepository;
import pl.polsl.snapsort.service.ThumbnailDataService;

import javax.persistence.EntityNotFoundException;

@Service
public class ThumbnailDataServiceImpl implements ThumbnailDataService {
    private final ThumbnailDataRepository thumbnailDataRepository;

    public ThumbnailDataServiceImpl(ThumbnailDataRepository thumbnailDataRepository) {
        this.thumbnailDataRepository = thumbnailDataRepository;
    }


    @Override
    public ThumbnailData saveThumbnailData(ThumbnailData thumbnailData) {
        return thumbnailDataRepository.save(thumbnailData);
    }

    @Override
    public void deleteThumbnailData(Long thumbnailDataId) {
        thumbnailDataRepository.deleteById(thumbnailDataId);
    }

    @Override
    public ThumbnailData getThumbnailDataById(Long thumbnailDataId) {
        return thumbnailDataRepository.findById(thumbnailDataId)
                .orElseThrow(() -> new EntityNotFoundException("ThumbnailData not found with id: " + thumbnailDataId));
    }
}

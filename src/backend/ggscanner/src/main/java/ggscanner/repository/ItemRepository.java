package ggscanner.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import ggscanner.model.Item;

@Repository
//@RepositoryRestResource(collectionResourceRel = "item", path = "item")
public interface ItemRepository extends MongoRepository<Item, String> {

    Item findByBarcode(@Param("barcode") String barcode);
    //public Item findByBarcode(Long barcode);
      
}

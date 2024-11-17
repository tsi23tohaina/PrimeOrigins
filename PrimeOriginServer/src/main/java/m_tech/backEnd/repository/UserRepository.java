package m_tech.backEnd.repository;

import m_tech.backEnd.models.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Integer> {
      UserEntity findByUsername(String username);
}